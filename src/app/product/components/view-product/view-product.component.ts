import { Component, OnInit,AfterViewInit,OnDestroy, ElementRef} from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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
import { ProductPipe } from '../../pipes/product.pipe';
import { ModalProductComponent } from '../modal-product/modal-product.component';
import { Title, Meta } from '@angular/platform-browser';
import { ModalDialogComponent } from 'src/app/shared/components/modal-dialog/modal-dialog.component';

@Component({
  selector: 'view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit,AfterViewInit,OnDestroy {

  listSubscription:Subscription[];
  currentProduct:any;
  publicity:any;
  pipeProduct:ProductPipe;
  viewCurrentImg:string;
  formGroup: UntypedFormGroup;
  matcher:customErrorStateMatcher;

  constructor(
    private title: Title, private meta: Meta,
    private objPdfService:PdfService,
    public dialog:MatDialog,
    public  doneCheck:MatDialog,
    private objRouter:Router,
    private objSnackBar: MatSnackBar,
    private objHttpService:HttpService,
    private objActivatedRoute:ActivatedRoute,
    private objLocalStorageService:LocalStorageService,
    private objCryptoService:CryptoService,
    private objWindowSizeService:WindowSizeService,
    private objShareInformationService:ShareInformationService,
    public  objNavegationService:NavegationService)  
  { 
    this.pipeProduct = new ProductPipe();
    this.matcher = new customErrorStateMatcher();

    this.publicity = [[],[]];
    this.listSubscription = [new Subscription,new Subscription,new Subscription];
    this.currentProduct=this.objCryptoService.decrypted(atob(this.objActivatedRoute.snapshot.paramMap.get('data').replace(new RegExp("~","g") ,"/")));
        
    this.viewCurrentImg = './../../../../assets/default.jpg';

    this.formGroup =  new UntypedFormGroup({
        quantity:new UntypedFormControl(1,[Validators.required,Validators.min(1)])
      });

    this.objNavegationService.setPositionScrooll(0);
  }

  ngOnInit(): void 
  {
    this.title.setTitle('SCHP | Productos');
    this.meta.updateTag({name: "title", content: "Medidores de agua"});
    this.meta.updateTag({name: "description", content: "medidores de agua, como instalar medidores de agua, medidores de agua precio, medidores de agua potable, medidores de agua internos, medidor para agua Puebla, instalacion de medidor para agua Puebla, Venta de medidor para agua Puebla, Accesorios para medidor para agua Puebla, telemetria para medidor para agua, instalacion de medidores de agua en edificios, soluciones jmpf, instalacion de medidores de agua potable, costo instalacion de medidor de agua, proyecto de instalacion de medidores de agua, conexion para medidor de agua, cuadro de medidor de agua, programa de instalacion de medidores de agua, norma de instalacion de medidores de agua, instalar medidores de agua, instalacion de medidores de agua, costo por instalacion de medidor de agua, instalacion de medidor de flujo de agua, precio de instalacion de medidor de agua, instalacion del medidor de agua, normas para la instalacion de medidores de agua, cuanto cuesta la instalacion de un medidor de agua"});
    this.meta.updateTag({name: "keywords", content: "medidores de agua, como instalar medidores de agua, medidores de agua precio, medidores de agua potable, medidores de agua internos, medidor para agua Puebla, instalacion de medidor para agua Puebla, Venta de medidor para agua Puebla, Accesorios para medidor para agua Puebla, telemetria para medidor para agua, instalacion de medidores de agua en edificios, soluciones jmpf, instalacion de medidores de agua potable, costo instalacion de medidor de agua, proyecto de instalacion de medidores de agua, conexion para medidor de agua, cuadro de medidor de agua, programa de instalacion de medidores de agua, norma de instalacion de medidores de agua, instalar medidores de agua, instalacion de medidores de agua, costo por instalacion de medidor de agua, instalacion de medidor de flujo de agua, precio de instalacion de medidor de agua, instalacion del medidor de agua, normas para la instalacion de medidores de agua, cuanto cuesta la instalacion de un medidor de agua"});
    this.meta.updateTag({name: "site", content: "https://solucionesjmpf.com"});
    this.getViewProduct();
    
    this.listSubscription[1] = this.objShareInformationService.search3$.subscribe((response:string)=>{
      this.objLocalStorageService.save('selpro',this.objCryptoService.encrypted(response));
      this.objNavegationService.navegatePage("Product/List");
    });

    this.listSubscription[2] = this.objShareInformationService.reloadSamePage$.subscribe((response:any)=>{
      this.viewAnotherProduct(response);
    });
  }

  ngAfterViewInit() 
  {
    setTimeout(() => {
      this.objNavegationService.currentSelectMenu(this.objRouter.url);
    }, 100);
  }
  
  ngOnDestroy()
  {
    this.listSubscription.forEach(itrSub => { itrSub.unsubscribe();});
  }

  getViewProduct()
  {
    this.objShareInformationService.viewLoading$.emit(true);

    this.objHttpService.getProduct({
      id:this.currentProduct.id,
      publicity:1
    }).subscribe(
      res=>
      {
        let data:any = this.objCryptoService.decrypted(res['data']);
        this.currentProduct = data.product;
        this.publicity = [data.publicity.listProduct1,data.publicity.listProduct2];

        this.viewCurrentImg = this.currentProduct.files.length!=0 ?
        this.pipeProduct.transform(this.currentProduct.files[0],0,'image2'):
        './../../../../assets/default.jpg';

        this.objShareInformationService.viewLoading$.emit(false);
      },
      err=>{
        this.objShareInformationService.viewLoading$.emit(false);
        this.objSnackBar.open("Error obtener producto",null,{duration: 2500,panelClass: ['snackBar_error']});
      }
    );
  }

  viewAnotherProduct(product:any):void
  {
    this.objShareInformationService.viewLoading$.emit(true);
    this.objNavegationService.setPositionScrooll(0);

    this.currentProduct = product;
    this.objLocalStorageService.remove(["cwlpro"]);
    this.objNavegationService.navegatePage("/Product/View/"+btoa(this.objCryptoService.encrypted(product)).replace(new RegExp("/","g") ,"~"));
    this.getViewProduct();
  }

  addProduct():void
  {
    if(this.formGroup.valid)
    {
      this.objShareInformationService.manageCarShopping$.emit({data:{
      product:this.currentProduct,quantity:this.formGroup.value["quantity"]},opc:0});

      //this.objSnackBar.open("Producto agregado al carrito",null,{duration: 2500,panelClass: ['snackBar_success']});
      this.objNavegationService.navegatePage("/Product/ShoppingCar");
    }
    else
      this.formGroup.controls.quantity.markAsTouched();
  }

  requestQuotation():void
  {
    if(this.formGroup.valid)
    {
      const dialogRef = this.objWindowSizeService.checkMaxScreenSize(767)?
      this.dialog.open(ModalProductComponent,{panelClass:'filter',width:'90vw',maxWidth:'90vw',
      closeOnNavigation:true,autoFocus: false,data:{opcView:2}}):
      this.dialog.open(ModalProductComponent,{closeOnNavigation:true,autoFocus: false,data:{opcView:2}});  
                
      dialogRef.afterClosed().subscribe(response => { 
        if(response!=undefined && response!=null &&  response)
        {
            this.objShareInformationService.viewLoading$.emit(true);
            this.objHttpService.registerQuotationWeb({
              contact:response,
              ip_address:this.objCryptoService.decrypted(this.objLocalStorageService.view("adip")),
              listProduct:[{product:this.currentProduct,quantity:this.formGroup.value["quantity"]}]
            }).subscribe(
              res=>
              {
                if(res['data'] != undefined)
                {
                  let data:any=this.objCryptoService.decrypted(res["data"]);
                  this.objPdfService.generatePDF(data.name,data.data);
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
    else
      this.formGroup.controls.quantity.markAsTouched();
  }
}
