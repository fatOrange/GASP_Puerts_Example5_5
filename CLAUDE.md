# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **PuerTS integration example** for **Unreal Engine 5.5**, demonstrating how to use TypeScript/JavaScript scripting within an Unreal Engine project. PuerTS is a JavaScript runtime developed by Tencent that enables running TypeScript/JavaScript code in Unreal Engine, bridging the gap between web technologies and game development.

## Development Commands

### TypeScript Development
- **Start TypeScript compilation**: `npm start` (runs `tsc --watch`)
- **Install dependencies**: `npm install`
- **TypeScript compilation**: `tsc` (one-time compilation)

### Build & Run
- Open `GASP_Puerts_Example.uproject` in Unreal Editor
- Build the project using UE5's standard build system
- The TypeScript files are automatically compiled to `/Content/JavaScript/` and loaded by the game

### Type Checking
- TypeScript compilation will show errors in the console when running `npm start`
- Use VS Code or similar editor with TypeScript support for real-time error checking

## Architecture Overview

### Core Integration Flow

1. **C++ Game Instance** (`Source/GASP_Puerts_Example/MyGameInstance.cpp`)
   - Creates and manages the PuerTS JavaScript environment (`puerts::FJsEnv`)
   - Loads `MainGame.js` as the entry point on game startup
   - Properly shuts down JS environment on game exit

2. **TypeScript → JavaScript Pipeline**
   - Write TypeScript in `/TypeScript/` directory
   - TypeScript compiler outputs to `/Content/JavaScript/`
   - UE5 loads and executes the compiled JavaScript at runtime

3. **Blueprint-TypeScript Integration** (`TypeScript/Blueprints/BP_Cube.ts`)
   - Demonstrates extending Blueprint classes with TypeScript logic
   - Uses `blueprint.tojs()` to convert Blueprint classes
   - Uses `blueprint.mixin()` to combine Blueprint and TypeScript functionality
   - Access UE5 APIs through properly typed interfaces

### Directory Structure

- **`/Source/GASP_Puerts_Example/`**: C++ source code that integrates PuerTS
- **`/TypeScript/`**: TypeScript source files (write your TS code here)
- **`/Content/JavaScript/`**: Compiled JavaScript output (auto-generated, don't edit)
- **`/Typing/`**: TypeScript definitions for UE5 and PuerTS APIs
- **`/Plugins/Puerts/`**: PuerTS plugin with V8 engine integration

### Key Files

- **`MyGameInstance.h/.cpp`**: Initializes PuerTS environment and loads main script
- **`TypeScript/MainGame.ts`**: Entry point for TypeScript application
- **`TypeScript/Blueprints/BP_Cube.ts`**: Example of Blueprint class extension
- **`tsconfig.json`**: TypeScript compiler configuration
- **`Typing/ue/`**: Complete TypeScript definitions for UE5 engine APIs

## TypeScript Development Patterns

### Extending Blueprint Classes
```typescript
const uclass = UE.Class.Load('/Game/Blueprints/BP_MyClass.BP_MyClass_C');
const jsClass = blueprint.tojs<typeof UE.Game.Blueprints.BP_MyClass.BP_MyClass_C>(uclass);

interface TS_MyClass extends UE.Game.Blueprints.BP_MyClass.BP_MyClass_C {}
class TS_MyClass implements TS_MyClass {
    ReceiveBeginPlay(): void {
        // Your TypeScript logic
    }
    
    ReceiveTick(deltaSeconds: number): void {
        // Your TypeScript logic
    }
}

blueprint.mixin(jsClass, TS_MyClass);
```

### UE5 API Usage
- Use `this.K2_GetActorRotation()` instead of `this.GetActorRotation()`
- Use `UE.NewStruct(UE.Rotator.StaticStruct()) as UE.Rotator` for creating UE structs
- Cast objects appropriately: `as UE.Rotator`, `as UE.Vector`, etc.

## PuerTS Plugin Architecture

The project uses a comprehensive PuerTS plugin with multiple modules:

### Runtime Modules
- **`WasmCore`**: WebAssembly support for performance-critical operations
- **`JsEnv`**: JavaScript environment management and V8 integration
- **`Puerts`**: Main runtime functionality and Blueprint-JS bridging

### Editor Modules  
- **`DeclarationGenerator`**: Auto-generates TypeScript definitions for UE5 classes
- **`PuertsEditor`**: Editor tooling and development workflow integration

## Type Definitions

The `/Typing/` directory contains comprehensive TypeScript definitions:

- **`ue/`**: Complete UE5 engine API definitions
- **`puerts/`**: PuerTS-specific APIs and utilities  
- **`cpp/`**: C++ to TypeScript bindings
- **`ffi/`**: Foreign Function Interface support

These provide full IntelliSense and compile-time type checking for UE5 development.

## Development Workflow

1. **Write TypeScript**: Create/edit files in `/TypeScript/`
2. **Compile**: Run `npm start` to start watch mode compilation
3. **Test in UE5**: Launch the project in Unreal Editor
4. **Debug**: Use console.log() and UE5's output log for debugging
5. **Hot Reload**: TypeScript changes are compiled automatically and can be reloaded in UE5

## Common Issues

### TypeScript Compilation Errors
- Ensure proper type casting for UE5 objects: `as UE.Rotator`
- Use Blueprint-compatible method names: `K2_GetActorRotation()` vs `GetActorRotation()`
- Check that all UE5 types are properly imported from the `ue` module

### Runtime Issues
- Verify that Blueprint classes exist at the specified paths
- Ensure the PuerTS environment is properly initialized in `MyGameInstance`
- Check UE5's output log for JavaScript runtime errors

## Integration Notes

This project demonstrates production-ready integration between TypeScript and UE5 using PuerTS. The architecture supports:

- **Type-safe development** with full UE5 API definitions
- **Hot reload capabilities** for rapid iteration  
- **Blueprint extension** without modifying original Blueprint assets
- **Modern JavaScript features** through V8 engine integration
- **Performance optimization** through WebAssembly support

The setup is based on Tencent's production-used PuerTS framework and provides a solid foundation for large-scale projects requiring both UE5's visual scripting and modern web development practices.