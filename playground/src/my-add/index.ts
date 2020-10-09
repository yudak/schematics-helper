import { chain, Rule, schematic, SchematicContext, Tree } from '@angular-devkit/schematics';



// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function ngAdd(_options: any): Rule {
  return (_tree: Tree, _context: SchematicContext) => {
    // context.addTask(
    //   new RunSchematicTask('dependencies', { project: _options.name })
    // );
    // context.addTask(
    //   new RunSchematicTask('module', { project: _options.name })
    // );
    // return tree;
    return chain([
      schematic('dependencies', _options),
      schematic('workspace', _options), //runs - schematic('module', _options),
      
      // schematic('dependencies', _options),
    ]);
  };
}
