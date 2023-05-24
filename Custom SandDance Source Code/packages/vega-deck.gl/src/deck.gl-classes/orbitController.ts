// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
//
import OrbitController from '@deck.gl/core/controllers/orbit-controller';
import { base } from '../base';
//import {emit} from  'scripts/emitter';

export interface OrbitControllerClassOptions {
    doubleClickHandler?: (e: MouseEvent, orbitController: OrbitController_Class) => void;
}

export function createOrbitControllerClass(factoryOptions: OrbitControllerClassOptions): typeof OrbitController_Class {

    function wrapper(props: any) {

        class OrbitControllerInternal extends base.deck.OrbitController {
            public invertPan: boolean;
            public dragRotate: boolean;

            constructor(props: any) {
                super(props);
                this.invertPan = true;
            }

            handleEvent(event: MouseEvent) {
                //emit('mouse_event', event.type);
                //wont change

                if (event.type == 'panend')
                    console.log("dalu," + Date.now() + ",VizTransform,VisualizationMoved");
                
                if (event.type == 'wheel')
                    if (event['delta'] == 100)
                        console.log("dalu," + Date.now() + ",VizTransform,VisualizationZoomIn");
                    else
                        console.log("dalu," + Date.now() + ",VizTransform,VisualizationZoomOut");

                if (event.type === 'doubletap') {
                    if (factoryOptions && factoryOptions.doubleClickHandler) {
                        return factoryOptions.doubleClickHandler(event, this);
                    }
                }
                return super.handleEvent(event);
            }
        }

        const instance = new OrbitControllerInternal(props) as OrbitController;

        return instance;
    }

    return wrapper as any;
}

export declare class OrbitController_Class extends base.deck.OrbitController { }
