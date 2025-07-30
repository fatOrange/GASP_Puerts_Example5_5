import * as UE from 'ue';
import {$set, $Ref, blueprint, $unref, $ref} from 'puerts';

const uclass = UE.Class.Load('/Game/Blueprints/BP_Cube.BP_Cube_C');
const jsClass = blueprint.tojs<typeof UE.Game.Blueprints.BP_Cube.BP_Cube_C>(uclass);

interface TS_Cube extends UE.Game.Blueprints.BP_Cube.BP_Cube_C {}
class TS_Cube implements TS_Cube {
    // ReceiveBeginPlay(): void {
    //     console.log("TS_Cube ReceiveBeginPlay called");
    //     // You can add more TypeScript specific logic here
    // }

    // ReceiveTick(deltaSeconds: number): void {        
    //     // Get current rotation
    //     const currentRotation = this.K2_GetActorRotation();
    //     // console.log("ReceiveTick");
    //     // Create rotation speed (degrees per second)
    //     const rotationSpeed = 3000.0; // 90 degrees per second
    //     // console.log(rotationSpeed);
    //     // Calculate new rotation
    //     const newYaw = currentRotation.Yaw + (rotationSpeed * deltaSeconds);
    //     const newRotation = UE.NewStruct(UE.Rotator.StaticStruct()) as UE.Rotator;
    //     newRotation.Pitch = currentRotation.Pitch;
    //     newRotation.Yaw = newYaw;
    //     newRotation.Roll = currentRotation.Roll;
        
    //     // Apply rotation
    //     this.K2_SetActorRotation(newRotation, false);
    // }

    TS_PrintHelloWorld(InputStr:  $Ref<string>, OutputStr: $Ref<string>): void {
        console.log(`console:${InputStr}`);
        $set(OutputStr, `Hello from TypeScript! You passed: ${$unref(InputStr)}`);
    }

    TS_CreatePlayerInfo(Output_playerInfo: $Ref<UE.Game.Blueprints.S_Player.S_Player>): void {
        const S_PlayerStruct = UE.UserDefinedStruct.Load('/Game/Blueprints/S_Player.S_Player');
        const playerInfo = UE.NewStruct(S_PlayerStruct) as UE.Game.Blueprints.S_Player.S_Player;
        playerInfo.Username = "Player1";
        playerInfo.ID = UE.Guid.NewGuid();
        $set(Output_playerInfo, playerInfo);
        console.log("TS_CreatePlayerInfo called, created player info:", playerInfo);

        blueprint.load(UE.Game.Blueprints.BP_Ball.BP_Ball_C);
        const ballInstance =  UE.GameplayStatics.BeginDeferredActorSpawnFromClass(
            this,
            UE.Game.Blueprints.BP_Ball.BP_Ball_C.StaticClass(),
            UE.Transform.Identity,
            UE.ESpawnActorCollisionHandlingMethod.Undefined,
        );

        // 设置 ballInstance的坐标 是在Cube边上
        UE.GameplayStatics.FinishSpawningActor(ballInstance, UE.Transform.Identity);
        ballInstance.K2_SetActorLocation(this.K2_GetActorLocation().op_Addition(new UE.Vector(30,0,0)),false,$ref(),false);
        
        // 将 ballInstance 放大
        ballInstance.SetActorScale3D(new UE.Vector(5.0, 2.0, 2.0));
        console.log("TS_CreatePlayerInfo");
    }
    
}

blueprint.mixin(jsClass, TS_Cube);
