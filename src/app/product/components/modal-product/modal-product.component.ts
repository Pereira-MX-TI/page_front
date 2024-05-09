import { Component, Inject, OnInit } from '@angular/core'
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms'
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog'
import { ShareInformationService } from '@services/share-information/share-information.service'
import { ModalDialogComponent } from 'src/app/shared/components/modal-dialog/modal-dialog.component'

@Component({
  selector: 'app-modal-product',
  templateUrl: './modal-product.component.html',
  styleUrls: ['./modal-product.component.css'],
})
export class ModalProductComponent implements OnInit {
  case: number
  titleFilter: string
  listFilter: any[]
  formGroup: UntypedFormGroup
  siteKey: string

  constructor(
    private dialogRef: MatDialogRef<ModalProductComponent>,
    public dialog: MatDialog,
    private objShareInformationService: ShareInformationService,

    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.case = this.data['opcView']

    switch (this.case) {
      case 0:
        {
          this.listFilter = []
          switch (this.data['opcFilter']) {
            case 3:
              {
                this.titleFilter = 'Categorias'
                this.listFilter = this.data['filters']['categories']
              }
              break

            case 5:
              {
                this.titleFilter = 'Marcas'
                this.listFilter = this.data['filters']['brands']
              }
              break

            case 7:
              {
                this.titleFilter = 'Materiales'
                this.listFilter = this.data['filters']['materials']
              }
              break
          }
        }
        break

      case 1:
        {
          this.listFilter = [
            {
              title: 'Categorias',
              list: this.data['filters']['categories'],
              status: false,
              opcFilter: 3,
            },
            {
              title: 'Marcas',
              list: this.data['filters']['brands'],
              status: false,
              opcFilter: 5,
            },
            {
              title: 'Materiales',
              list: this.data['filters']['materials'],
              status: false,
              opcFilter: 7,
            },
          ]
        }
        break

      case 2:
        {
          this.siteKey = '6Ldh7AIgAAAAAEacOyipXcnaEqTDDKJW6yxlRoiF'
          this.formGroup = new UntypedFormGroup({
            name: new UntypedFormControl('', [Validators.required]),
            email: new UntypedFormControl('', [Validators.required]),
            phone: new UntypedFormControl(''),
            cp: new UntypedFormControl('', [Validators.required]),
            recaptcha: new UntypedFormControl('', [Validators.required]),
          })
        }
        break
    }
  }

  ngOnInit(): void {}

  setResponse(data: any): void {
    switch (this.case) {
      case 0:
        this.dialogRef.close(data)
        break
      case 1:
        this.dialogRef.close(data)
        break
      case 2:
        {
          if (this.formGroup.valid) {
            const dialogRef = this.dialog.open(ModalDialogComponent, {
              closeOnNavigation: true,
              autoFocus: false,
              data: {
                listMessage: [
                  'Confirmar',
                  '¿Desea continuar con la solicitud?',
                  'Aceptar',
                  'rgb(0, 0, 97)',
                ],
                opcView: 0,
              },
            })

            dialogRef.afterClosed().subscribe((response) => {
              if (response != undefined && response != null && response)
                this.dialogRef.close({
                  name: this.formGroup.value['name'],
                  email: this.formGroup.value['email'],
                  phone: this.formGroup.value['phone'],
                  cp: this.formGroup.value['cp'],
                })
            })
          } else {
            this.formGroup.controls.name.markAsTouched()
            this.formGroup.controls.email.markAsTouched()
            this.formGroup.controls.cp.markAsTouched()
          }
        }
        break
    }
  }
}
