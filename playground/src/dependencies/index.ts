// You don't have to export the function as default. You can also have more than one rule factory
// per file.
import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import {
  NodeDependency,
  NodeDependencyType,
  getPackageJsonDependency,
  addPackageJsonDependency,
  removePackageJsonDependency,
} from '@schematics/angular/utility/dependencies';

export function playground(_options: any): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const dependencys: NodeDependency[] = [
      {
        type: NodeDependencyType.Default,
        name: 'moment',
        version: '~2.27.0',
        overwrite: true,
      },
      {
        type: NodeDependencyType.Default,
        name: '@yudak/yk-tools',
        version: '~0.0.3',
        overwrite: true,
      }];
      dependencys.forEach(dep => {
        addPackageJsonDependency(tree, dep);
        console.log(getPackageJsonDependency(tree, dep.name));
        // { type: 'devDependencies', name: 'moment', version: '~2.27.0' }
    });


    removePackageJsonDependency(tree, 'protractor');
    console.log(getPackageJsonDependency(tree, 'protractor'))
    // null

    context.addTask(new NodePackageInstallTask(), []);
    console.log();

    return tree;
  };
}
