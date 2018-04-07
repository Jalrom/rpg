import { Iron } from '../minerals/iron';
import { Bronze } from '../minerals/bronze';
import { Scene } from '../scene';
import { Player } from '../player';
import { Mineral } from 'app/minerals/mineral';
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import * as THREE from 'three';
import { Camera } from 'app/camera';
import { RaycasterService } from 'app/raycaster.service';
import { CollectRessourceVisitor } from '../visitors/collectRessourceVisitor';
import { HoverRessourceVisitor } from 'app/visitors/hoverRessourceVisitor';
import { Renderer } from 'app/renderer';

export const CANVAS_DIMENSIONS = {
  width: null,
  height: null
};

const NEAR = 1;
const FAR = 1000;

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

    @ViewChild('container') elementRef: ElementRef;
    private camera: THREE.PerspectiveCamera;
    private scene: THREE.Scene;
    private renderer: THREE.WebGLRenderer;

    private player: Player;
    private minerals: Mineral[];
    private minedMineral: Mineral;
    private mineralIdCounter: number;
    private mineralIndex: number;

    public constructor(private raycasterService: RaycasterService) {
        this.scene = Scene.Instance.scene;
        this.camera = Camera.Instance.camera;
        this.renderer = Renderer.Instance.renderer;
        this.minerals = [];
        this.mineralIdCounter = 0;
    }

    public ngOnInit(): void {
        this.renderer.setSize(
            (this.elementRef.nativeElement as HTMLDivElement).clientWidth,
            (this.elementRef.nativeElement as HTMLDivElement).clientHeight,
            true);
        document.getElementById('container').appendChild(this.renderer.domElement);
        this.createFloor();
        this.createMinerals();
        this.render();
    }

    public render(): void {
        requestAnimationFrame(() => this.render());
        this.renderer.render(this.scene, this.camera);
        this.minedMineral = null;
        for (let i = 0; i < this.minerals.length; i++) {
            this.minerals[i].material.color = this.minerals[i].color;
            const hoverRessourceVisitor = new HoverRessourceVisitor(this.raycasterService, this.minerals);
            if (hoverRessourceVisitor.visit(this.minerals[i])) {
                this.mineralIndex = i;
                this.minedMineral = this.minerals[i];
                break;
            }
        }
    }

    public onWindowResize(): void {
        CANVAS_DIMENSIONS.width = (this.elementRef.nativeElement as HTMLDivElement).clientWidth;
        CANVAS_DIMENSIONS.height = (this.elementRef.nativeElement as HTMLDivElement).clientHeight;
        this.camera.aspect = CANVAS_DIMENSIONS.width / CANVAS_DIMENSIONS.height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(CANVAS_DIMENSIONS.width, CANVAS_DIMENSIONS.height, false);
    }

    public onMouseMove(event: MouseEvent) {
        this.raycasterService.onMouseMove(event);
    }

    public onMouseDown(event: MouseEvent) {
        const collectRessourceVisitor = new CollectRessourceVisitor(this.minerals, this.mineralIndex, this.scene);
        collectRessourceVisitor.visit(this.minedMineral);
    }

    private createFloor() {
        const geometry = new THREE.PlaneGeometry(10, 10, 1, 1);
        const material = new THREE.MeshPhongMaterial({color: 0xbb4e1a, transparent: true, opacity: 0.5});
        const mesh = new THREE.Mesh(geometry, material);
        mesh.name = 'floor';
        mesh.rotateX(-Math.PI / 2);
        this.scene.add(mesh);
    }

    // TODO: Factory
    private createMinerals() {
        setInterval(() => {
            if (this.minerals.length < 100) {
                const bronze = new Bronze();
                bronze.mesh.name = String(this.mineralIdCounter++);
                let x = Math.random() * 10 - 5;
                let y = Math.random() * 3.5;
                let z = - 1;
                bronze.mesh.position.set(x, y, z);
                this.minerals.push(bronze);
                this.scene.add(bronze.mesh);

                const iron = new Iron();
                iron.mesh.name = String(this.mineralIdCounter++);
                x = Math.random() * 10 - 5;
                y = Math.random() * 3.5;
                z = - 1;
                iron.mesh.position.set(x, y, z);
                this.minerals.push(iron);
                this.scene.add(iron.mesh);
            }
        }, 500);
    }
}
