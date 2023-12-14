import { Component } from '@angular/core';
import { Receta } from '../receta';
import { FirestoreService } from '../firestore.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  recetaEditando = {} as Receta;

  arrayColeccionRecetas: any = [{
    id: "",
    receta: {} as Receta
  }];

  idRecetaSelect: string = "";


  constructor(private firestoreService: FirestoreService) {
    this.obtenerListaRecetas();
  }

  clickBotonInsertar() {

    this.firestoreService.insertar('recetas', this.recetaEditando).then(() => {

      console.log('Receta creada correctamente');
      this.recetaEditando = {} as Receta;
    }, (error) => {
      console.error(error);
    }
    );
  }

  obtenerListaRecetas() {

    this.firestoreService.consultar("recetas").subscribe((datosRecibidos) => {

      this.arrayColeccionRecetas = [];
    
      datosRecibidos.forEach((datosReceta) => {

        this.arrayColeccionRecetas.push({
          id: datosReceta.payload.doc.id,
          receta: datosReceta.payload.doc.data()
        })
      });
    });
  }


  selectReceta(idReceta: string, recetaSelect: Receta) {
    this.recetaEditando = recetaSelect;
    this.idRecetaSelect = idReceta;
  }


  clickBotonBorrar() {
    this.firestoreService.borrar('recetas', this.idRecetaSelect).then(() => {
      console.log('Receta borrada correctamente');
      this.recetaEditando = {} as Receta;
      this.idRecetaSelect = "";
    }, (error) => {
      console.error(error);
    }
    );
  }

  clickBotonModificar() {
    this.firestoreService.modificar('recetas', this.idRecetaSelect, this.recetaEditando).then(() => {
      console.log('Receta modificada correctamente');
    }, (error) => {
      console.error(error);
    }
    );

  }

  
}
