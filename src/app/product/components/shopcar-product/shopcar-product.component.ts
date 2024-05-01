import { Component, OnInit,AfterViewInit,Renderer2,ViewChild,AfterContentInit, OnDestroy, ElementRef} from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { customErrorStateMatcher } from 'src/app/customErrorStateMatcher';
import { CryptoService } from 'src/app/services/crypto.service';
import { HttpService } from 'src/app/services/http.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { NavegationService } from 'src/app/services/navegation.service';
import { PdfService } from 'src/app/services/pdf.service';
import { ShareInformationService } from 'src/app/services/share-information.service';
import { WindowSizeService } from 'src/app/services/window-size.service';
import { ModalDialogComponent } from 'src/app/shared/components/modal-dialog/modal-dialog.component';
import { ProductPipe } from '../../pipes/product.pipe';
import { ModalProductComponent } from '../modal-product/modal-product.component';

@Component({
  selector: 'app-shopcar-product',
  templateUrl: './shopcar-product.component.html',
  styleUrls: ['./shopcar-product.component.css']
})
export class ShopCarProductComponent implements OnInit {

  listSubscription:Subscription[];
  publicity:any;
  pipeProduct:ProductPipe;
  dataSourceFilter:MatTableDataSource<any>;
  shoppingCar:any[];
  displayedColumns:string[];
  listColumns:any;
  formGroup: UntypedFormGroup[];

  constructor(
    private objPdfService:PdfService,
    public  dialog:MatDialog,
    public  doneCheck:MatDialog,
    private objRouter:Router,
    private objSnackBar: MatSnackBar,
    private objHttpService:HttpService,
    private objLocalStorageService:LocalStorageService,
    private objCryptoService:CryptoService,
    private objWindowSizeService:WindowSizeService,
    private objShareInformationService:ShareInformationService,
    public  objNavegationService:NavegationService)   
    {
      this.listSubscription = [new Subscription,new Subscription,new Subscription];
      this.publicity = [[],[]];
      this.pipeProduct = new ProductPipe();
      this.dataSourceFilter = new MatTableDataSource<any>([]);

      this.displayedColumns = ['image','description'];
      this.listColumns = {"image":'',"description":'DESCRIPTION'};

      this.formGroup =  [];
      this.shoppingCar = [];
    }

  ngOnInit(): void 
  {
    if(this.objLocalStorageService.exist("shCa"))
    {
      this.shoppingCar = this.objCryptoService.decrypted(this.objLocalStorageService.view("shCa"));
      this.dataSourceFilter = new MatTableDataSource<any>(this.objCryptoService.decrypted(this.objLocalStorageService.view("shCa"))); 
      
      this.shoppingCar.forEach(itrData => {
        this.formGroup.push(new UntypedFormGroup({
          quantity:new UntypedFormControl(itrData.quantity,[Validators.required,Validators.min(1)])
        }));
      });
    }
    this.getPublicity();
    
    this.listSubscription[1] = this.objShareInformationService.search3$.subscribe((response:string)=>{
      this.objLocalStorageService.save('selpro',this.objCryptoService.encrypted(response));
      this.objNavegationService.navegatePage("Product/List");
    });
  }

  ngOnDestroy()
  {
    this.listSubscription.forEach(itrSub => { itrSub.unsubscribe();});
  }

  ngAfterViewInit() 
  {
    setTimeout(() => {
      this.objNavegationService.setPositionScrooll(0);
      this.objNavegationService.currentSelectMenu(this.objRouter.url);
    }, 100);
  }

  getPublicity()
  {
    let listId:any[] =[];
    this.shoppingCar.forEach(itrProduct => {listId.push(itrProduct['product']['id']);});

    this.objShareInformationService.viewLoading$.emit(true);
    this.objHttpService.getPublicity({listProduct:listId}).subscribe(
      res=>
      {
        let data:any = this.objCryptoService.decrypted(res['data']);  
        this.publicity = [data.carrousel1,data.carrousel2];
        this.objShareInformationService.viewLoading$.emit(false);
      },
      err=>{
        this.objShareInformationService.viewLoading$.emit(false);
        this.objSnackBar.open("Error obtener publicidad",null,{duration: 2500,panelClass: ['snackBar_error']});
      }
    );
  }

  viewProduct(product:any):void
  {
    this.objLocalStorageService.remove(["cwlpro"]);
    this.objNavegationService.navegatePage("/Product/View/"+btoa(this.objCryptoService.encrypted(product)).replace(new RegExp("/","g") ,"~"));
  }

  removeProduct(index:number):void
  {
    this.formGroup.splice(index,1);
    this.shoppingCar.splice(index,1);

    this.dataSourceFilter.filteredData.splice(index,1);

    this.dataSourceFilter.filter = "~";
    this.dataSourceFilter.filter = "";

    this.objShareInformationService.manageCarShopping$.emit({data:this.shoppingCar,opc:1});
  }

  changeQuantity(opc:number):void
  { 
    if(this.formGroup[opc].valid)
    {
      this.dataSourceFilter.filteredData[opc].quantity = this.formGroup[opc].value["quantity"];
      this.shoppingCar[opc].quantity = this.formGroup[opc].value["quantity"];

      this.objLocalStorageService.save("shCa",this.objCryptoService.encrypted(this.shoppingCar));
    }    
    else
      this.formGroup[opc].controls.quantity.markAsTouched();
  }

  requestQuotation():void
  {
    const dialogRef = this.objWindowSizeService.checkMaxScreenSize(767)?
    this.dialog.open(ModalProductComponent,
    {panelClass:'filter',width:'90vw',maxWidth:'90vw',closeOnNavigation:true,autoFocus: false,data:{opcView:2}})
    :this.dialog.open(ModalProductComponent,{closeOnNavigation:true,autoFocus: false,data:{opcView:2}});  
              
    dialogRef.afterClosed().subscribe(response => { 
      if(response!=undefined && response!=null &&  response)
      {
        this.objShareInformationService.viewLoading$.emit(true);
        this.objHttpService.registerQuotationWeb({
          contact:response,
          ip_address:this.objCryptoService.decrypted(this.objLocalStorageService.view("adip")),
          listProduct:this.shoppingCar
        }).subscribe(
          res=>
          {
            if(res['data'] != undefined)
            {
              let data:any=this.objCryptoService.decrypted(res["data"]);
              this.objPdfService.generatePDF(data.name,data.data);

              this.shoppingCar = [];
              this.dataSourceFilter = new MatTableDataSource<any>([]);    
              this.dataSourceFilter.filter = "~";
              this.dataSourceFilter.filter = "";
              this.objShareInformationService.manageCarShopping$.emit({opc:2})             
              this.objShareInformationService.viewLoading$.emit(false);

              this.doneCheck.open(ModalDialogComponent,{closeOnNavigation:true,autoFocus: false,
              data:{message:"La solicitud ha sido enviada con exito",opcView:3}});          
            }
            else
            {
              this.objShareInformationService.viewLoading$.emit(false);
              this.objSnackBar.open(res['description'],null,{duration: 3000,panelClass: ['snackBar_error']});
            }
          },
          err=>{
            this.objShareInformationService.viewLoading$.emit(false);
            this.objSnackBar.open("Error obtener folio",null,{duration: 2500,panelClass: ['snackBar_error']});
          });
      }
    });
  }
}
