// Fill out your copyright notice in the Description page of Project Settings.


#include "MyGameInstance.h"

void UMyGameInstance::OnStart()
{
	Super::OnStart();

	if (bDebugMode)
	{
		GameScript = MakeShared<puerts::FJsEnv>(
			std::make_unique<puerts::DefaultJSModuleLoader>(TEXT("JavaScript")),
			std::make_shared<puerts::FDefaultLogger>(),
			20020
		);
		if (bWaitForDebugger)
		{
			GameScript->WaitDebugger();
		}
	}
	else
	{
		GameScript = MakeShared<puerts::FJsEnv>();
	}
	GameScript -> Start("MainGame");
}


void UMyGameInstance::Shutdown()
{
	GameScript.Reset();
	Super::Shutdown();
}
