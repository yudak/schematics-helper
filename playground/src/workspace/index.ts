import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { RunSchematicTask } from '@angular-devkit/schematics/tasks';
import { createDefaultPath } from '@schematics/angular/utility/workspace';

export function playground(_options: any): Rule {
  return async (tree: Tree, _context: SchematicContext) => {
    console.log( _options);
    const defaultPath = await createDefaultPath(tree, _options.name);
    _context.addTask(
      new RunSchematicTask('module', { path: defaultPath })
    )
    
    console.log(defaultPath); // '/projects/my-lib/src/lib'
  };
}
