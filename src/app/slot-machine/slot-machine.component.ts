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
      state('open', style({
        height: '100px',
        opacity: 0.8,
        backgroundImage: 'url("../../assets/img-x.png")',
        backgroundSize: 'cover'
      })),
      state('closed', style({
        height: '100px',
        opacity: 0.8,
        backgroundImage: 'url("../../assets/img-mercedes.jpeg")',
        backgroundSize: 'cover'
      })),
      transition('closed => open', [
        animate('200ms', keyframes([
          style({transform: 'rotateX(0)'}),
          style({transform: 'rotateX(90deg)'}),
          style({transform: 'rotateX(180deg)'}),
          style({transform: 'rotateX(360deg)'})
        ]))
      ]),
      transition('open => closed', [
        animate('200ms', keyframes([
          style({transform: 'rotateX(0)'}),
          style({transform: 'rotateX(90deg)'}),
          style({transform: 'rotateX(180deg)'}),
          style({transform: 'rotateX(360deg)'})
        ]))
      ]),

    ]),
  ]
})
export class SlotMachineComponent implements OnInit {
  points: number = 0;
  selector: number = 0;
  result: string = 'Jogar'
  isOpen = true;
  spin!: NodeJS.Timeout;

  constructor(private slotMachineService: SlotMachineService) { }



  toggle() {
    this.spin = setTimeout(() => {

        this.isOpen = !this.isOpen
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
      this.toggle();
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
      this.isOpen = false;
      clearTimeout(this.spin);
    this.result = "Você ganhou";
    }
    else
    {
      this.isOpen = true;
      clearTimeout(this.spin);
      this.result = "Você perdeu";
    }
  }

}
