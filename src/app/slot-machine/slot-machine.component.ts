import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { SlotMachineService } from '../services/slot-machine.service';

@Component({
  selector: 'app-slot-machine',
  templateUrl: './slot-machine.component.html',
  styleUrls: ['./slot-machine.component.scss'],
  animations: [
    trigger('openClose', [
      // ...
      state('1', style({
        backgroundImage: 'url("../../assets/img-mercedes.jpeg")',
        backgroundSize: 'cover'
      })),
      state('3', style({
        backgroundImage: 'url("../../assets/img-x.png")',
        backgroundSize: 'cover'
      })),
      state('2', style({
        // backgroundImage: 'url("../../assets/img-mercedes.jpeg")',
        backgroundColor: '#32a852',
        backgroundSize: 'cover'
      })),
      transition('* => *', [
        animate('250ms', keyframes([
          style({transform: 'rotateX(0) translateZ(30px)'}),
          style({transform: 'rotateX(30deg) translateZ(30px)'}),
          style({transform: 'rotateX(60deg) translateZ(30px)'}),
          style({transform: 'rotateX(90deg) translateZ(30px)'}),
          style({transform: 'rotateX(120deg) translateZ(30px)'}),
          style({transform: 'rotateX(150deg) translateZ(30px)'}),
          style({transform: 'rotateX(180deg) translateZ(30px)'}),
          style({transform: 'rotateX(210deg) translateZ(30px)'}),
          style({transform: 'rotateX(240deg) translateZ(30px)'}),
          style({transform: 'rotateX(270deg) translateZ(30px)'}),
          style({transform: 'rotateX(300deg) translateZ(30px)'}),
          style({transform: 'rotateX(330deg) translateZ(30px)'}),
          style({transform: 'rotateX(360deg) translateZ(30px)'})
        ]))
      ]),

    ]),
    trigger('handle', [
      transition('0 => 1', [
        animate('100ms', keyframes([
          style({transform: 'translatey(0)'}),
          style({transform: 'translatey(30px)'}),
        ]))
      ]),
    ])
  ]
})

export class SlotMachineComponent implements OnInit {
  points: number = 0;
  selector: number = 0;
  result: string = 'Jogar'
  played: number = 1;
  leftColumn: number = 1;
  centerColumn: number = 1;
  rightColumn: number = 1;
  spin!: NodeJS.Timeout;

  constructor(private slotMachineService: SlotMachineService) { }



  toggle() {
    this.spin = setTimeout(() => {

        this.leftColumn = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
        this.centerColumn = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
        this.rightColumn = Math.floor(Math.random() * (3 - 1 + 1)) + 1;

        this.toggle();
    }, 300);
  }

  ngOnInit(): void {
    this.slotMachineService.getPoints().subscribe((dados) => {
      this.points = dados.points;
    })
  }

  onSpin() {
    if (this.points >= 2000) {
      this.points = this.points - 2000;
      this.slotMachineService.spin(this.selector).subscribe((dados) => {
        this.checkResult(dados.result);
        // alert(this.result);
      }, (error) => {
        console.log(error);
      })
    }
    else {
      alert('pontos insuficientes');
    }
    this.swapSelector();
  }

  swapSelector() {
    if (this.selector == 1)
      this.selector = 0;
    else
      this.selector = 1;
  }

  checkResult(resultAPI: boolean) {
    if (resultAPI){
      this.leftColumn = 1;
      this.centerColumn = 1;
      this.rightColumn = 1;
      clearTimeout(this.spin);
      this.result = "Você ganhou";
    }
    else {
      this.leftColumn = Math.floor(Math.random() * (3 - 2 + 1)) + 2;
      this.centerColumn = Math.floor(Math.random() * (3 - 2 + 1)) + 2;
      this.rightColumn = Math.floor(Math.random() * (3 - 2 + 1)) + 2;
      clearTimeout(this.spin);
      this.result = "Você perdeu";
    }
    
    this.played = 1;
  }

  playHandle(){
    this.played = 0;
    this.onSpin();
  }

}
