import { ModuleLoader, ModuleRegistry } from '../types';

class DynamicModuleLoader implements ModuleLoader {
  private loadedModules: Map<string, ModuleRegistry> = new Map();

  async loadModule(name: string, url: string): Promise<void> {
    if (this.loadedModules.has(name)) {
      return;
    }

    try {
      const module = await import(/* webpackIgnore: true */ url);
      if (module.initialize) {
        await module.initialize();
      }
      
      this.loadedModules.set(name, module);
    } catch (error) {
      console.error(`Failed to load module ${name}:`, error);
      throw error;
    }
  }

  async unloadModule(name: string): Promise<void> {
    this.loadedModules.delete(name);
  }

  getLoadedModules(): string[] {
    return Array.from(this.loadedModules.keys());
  }
}

export const moduleLoader = new DynamicModuleLoader(); 