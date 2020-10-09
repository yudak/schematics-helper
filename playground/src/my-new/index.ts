import {
    Rule,
    SchematicContext,
    Tree,
    externalSchematic,
    schematic,
    chain
  } from '@angular-devkit/schematics';
  import {
    Schema as AngularNgNewSchema,
    PackageManager,
    Style
  } from '@schematics/angular/ng-new/schema';
  import {spawn} from 'child_process';
  
  export function ngNew(options: AngularNgNewSchema): Rule {
    return async (_tree: Tree, _context: SchematicContext) => {
      const angularSchematicsPackage = '@schematics/angular';
      console.log('!!!', options);
      const ngNewOptions: AngularNgNewSchema = {
        version: '10.1.0',
        name: options.name,
        routing: true,
        strict: true,
        legacyBrowsers: true,
        style: Style.Scss,
        packageManager: PackageManager.Npm
      }
      await new Promise<boolean>((resolve) => {
        console.log('📦 Installing packages...');
        spawn(`npm i ${angularSchematicsPackage}`, {shell: true})
          .on('close', (code: number) => {
            if (code === 0) {
              console.log('📦 Packages installed successfully ✅');
              resolve(true);
            } else {
              throw new Error(
                `❌ install Angular schematics from '${angularSchematicsPackage}' failed`
              );
            }
          });
      });
      return chain([
        externalSchematic(angularSchematicsPackage, 'ng-new', ngNewOptions),
        schematic('ng-add', {})
      ]);
    };
  }