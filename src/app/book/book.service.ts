import {Http, RequestOptions, Headers} from '@angular/http';
import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from './book';
import { map } from 'rxjs/operators';

@Injectable()
export class BookService {

    constructor(private _httpService: Http){}
    
    getAllBooks(): Observable<Book[]>{ 
        return this._httpService.get("http://localhost:8080/api/book")
            .pipe(
                map((response: Response) => response.json())
            );
    }
    
    private handleError(error: Response) {
        return Observable.throw(error);
    }

    addBook(book: Book) {
        let body = JSON.stringify(book);
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        if(book.id){ 
            return this._httpService.put("http://localhost:8080/api/book/"+book.id,body,options)
        } else {
            return this._httpService.post("http://localhost:8080/api/book",body,options)
        }
    } 

    deleteBook(bookId: string) {
        return this._httpService.delete("http://localhost:8080/api/book/"+bookId);
    }

    getBookById(bookId: string): Observable<Book> {
        return this._httpService.get("http://localhost:8080/api/book/"+bookId)
            .pipe(
                map((response:Response) => response.json())
            );
    }
}