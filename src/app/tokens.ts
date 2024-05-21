import { InjectionToken } from "@angular/core";
import { NodeSpec, Plugin } from '@progress/kendo-angular-editor';
export const EditorPlugin = new InjectionToken<Plugin>('EditorPlugin');

export const EditorNode = new InjectionToken<NodeSpec>('EditorNode');