// Fill out your copyright notice in the Description page of Project Settings.


#include "MyGameInstance.h"

void UMyGameInstance::OnStart()
{
	Super::OnStart();
	GameScript = MakeShared<puerts::FJsEnv>();
	GameScript -> Start("MainGame");
}


void UMyGameInstance::Shutdown()
{
	GameScript.Reset();
	Super::Shutdown();
}
