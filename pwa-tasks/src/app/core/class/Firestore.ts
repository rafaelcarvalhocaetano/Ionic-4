import { AngularFirestore, AngularFirestoreCollection, QueryFn } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export abstract class Firestore<T extends { id: string }> {

  protected collection: AngularFirestoreCollection<T>;

  constructor(
    protected db: AngularFirestore
  ) {}

  // metodo responsável por verificar e criar uma coleção no banco
  protected setCollection(path: string, queryFn?: QueryFn): void {
    this.collection = path ? this.db.collection(path, queryFn) : null;
  }

  // metodo generico para por editar ou inserir registro no banco
  private setItem(item: T, operation: string): Promise<T> {
    return this.collection.doc<T>(item.id)[operation](item).then(() => item);
  }
  // private setItem(item: T, operation: 'set' | 'update'): Promise<T> {
  //   return this.collection.doc<T>(item.id)[operation](item).then(() => item);
  // }

  // metodo public que lista os registros do banco
  getAll(): Observable<T[]> {
    return this.collection.valueChanges();
  }

  // metodo para criar
  create(item: T): Promise<T> {
    item.id = this.db.createId();
    return this.setItem(item, 'set');
  }

  // metodo para atualizar
  update(item: T): Promise<T> {
    return this.setItem(item, 'update');
  }

  // metodo para deletar
  delete(item: T): Promise<void> {
    return this.collection.doc<T>(item.id).delete();
  }

  // metodo que busca o id
  get(id: string): Observable<T> {
    return this.collection.doc<T>(id).valueChanges();
  }
}
