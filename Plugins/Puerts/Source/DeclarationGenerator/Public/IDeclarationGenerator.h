/*
 * Tencent is pleased to support the open source community by making Puerts available.
 * Copyright (C) 2020 Tencent.  All rights reserved.
 * Puerts is licensed under the BSD 3-Clause License, except for the third-party components listed in the file 'LICENSE' which may
 * be subject to their corresponding license terms. This file is subject to the terms and conditions defined in file 'LICENSE',
 * which is part of this source code package.
 */

#pragma once

#include <cstdio>

#include "Modules/ModuleManager.h"
#include "CoreMinimal.h"

class IDeclarationGenerator : public IModuleInterface    //: public IScriptGeneratorPluginInterface
{
public:
    static inline IDeclarationGenerator& Get()
    {
        return FModuleManager::LoadModuleChecked<IDeclarationGenerator>("DeclarationGenerator");
    }

    static inline bool IsAvailable()
    {
        return FModuleManager::Get().IsModuleLoaded("DeclarationGenerator");
    }

    virtual void GenTypeScriptDeclaration(bool InGenFull, FName InSearchPath) = 0;

    virtual void GenReactDeclaration() = 0;
};
