import * as UE from 'ue';
import { blueprint } from 'puerts';

const uclass = UE.Class.Load('/Game/Blueprints/BP_Cube.BP_Cube_C');
const jsClass = blueprint.tojs<typeof UE.Game.Blueprints.BP_Cube.BP_Cube_C>(uclass);

interface TS_Cube extends UE.Game.Blueprints.BP_Cube.BP_Cube_C {}
class TS_Cube implements TS_Cube {
    ReceiveBeginPlay(): void {
        console.log("TS_Cube ReceiveBeginPlay called");
        // You can add more TypeScript specific logic here
    }

    ReceiveTick(deltaSeconds: number): void {
        console.log(`TS_Cube ReceiveTick called with deltaSeconds: ${deltaSeconds}`);
        
        // Get current rotation
        const currentRotation = this.K2_GetActorRotation();
        
        // Create rotation speed (degrees per second)
        const rotationSpeed = 90.0; // 90 degrees per second
        
        // Calculate new rotation
        const newYaw = currentRotation.Yaw + (rotationSpeed * deltaSeconds);
        const newRotation = UE.NewStruct(UE.Rotator.StaticStruct()) as UE.Rotator;
        newRotation.Pitch = currentRotation.Pitch;
        newRotation.Yaw = newYaw;
        newRotation.Roll = currentRotation.Roll;
        
        // Apply rotation
        this.K2_SetActorRotation(newRotation, false);
    }
}

blueprint.mixin(jsClass, TS_Cube);