import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (!value) {
      return [];
    }

    const resultPost = [];

    for (const post of value) {
      if (post.title && arg && post.title.indexOf(arg) > -1) {
        resultPost.push(post);
      }
    }
    return resultPost;
  }



}
