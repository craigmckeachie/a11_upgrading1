import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';
import { UpgradeModule, downgradeComponent } from '@angular/upgrade/static';
import { RouterModule, UrlHandlingStrategy } from '@angular/router';
import { AppComponent } from './app.component';
import { WidgetComponent } from './widget/widget.component';
import { phoneServiceProvider } from './phones/shared/phone.service';

@Injectable()
class CustomUrlHandlingStrategy implements UrlHandlingStrategy {
  shouldProcessUrl(url) {
    return url.toString().startsWith('/widget') || url.toString() === '/';
  }
  extract(url) {
    return url;
  }
  merge(url, whole) {
    return url;
  }
}

declare var angular: any;
angular
  .module('phonecatApp')
  .directive('appWidget', downgradeComponent({ component: WidgetComponent }));

@NgModule({
  declarations: [AppComponent, WidgetComponent],
  imports: [
    BrowserModule,
    UpgradeModule,
    RouterModule.forRoot(
      [
        {
          path: 'widget',
          component: WidgetComponent
        }
      ],
      {
    useHash: true,
    relativeLinkResolution: 'legacy'
}
    )
  ],
  entryComponents: [WidgetComponent],
  providers: [
    phoneServiceProvider,
    { provide: UrlHandlingStrategy, useClass: CustomUrlHandlingStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
