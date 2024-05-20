import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    template: ` <kendo-editor [value]="value" style="height: 570px;"></kendo-editor> `
})
export class AppComponent {
    public value = `
        <p>
            The Kendo UI Angular Editor allows your users to edit HTML in a familiar, user-friendly way.<br />
            In this version, the Editor provides the core HTML editing engine which includes basic text formatting, hyperlinks, and lists.
            The widget <strong>outputs identical HTML</strong> across all major browsers, follows
            accessibility standards, and provides API for content manipulation.
        </p>
        <div style="display: inline-block; width: 39%;">
            <p>Features include:</p>
            <ul>
                <li>Text formatting</li>
                <li>Bulleted and numbered lists</li>
                <li>Hyperlinks</li>
                <li>Cross-browser support</li>
                <li>Identical HTML output across browsers</li>
                <li>Inserting and resizing images</li>
            </ul>
        </div>
        <div style="display: inline-block; width: 60%; vertical-align: top;">
            <img src="https://demos.telerik.com/kendo-ui/content/web/editor/tenerife.png" width="100%" style="min-width: 10px; min-height: 10px;" alt="Tenerife" />
        </div>
    `;
}
