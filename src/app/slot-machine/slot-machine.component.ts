import { Component, OnInit } from '@angular/core';
import { SlotMachineService } from '../services/slot-machine.service';

@Component({
  selector: 'app-slot-machine',
  templateUrl: './slot-machine.component.html',
  styleUrls: ['./slot-machine.component.scss']
})
export class SlotMachineComponent implements OnInit {
  points: number = 0;
  selector: number = 0;
  result: string = 'Jogar'

  constructor(private slotMachineService: SlotMachineService) { }

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
        alert(this.result);
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
    if (resultAPI)
      this.result = "Você ganhou";
    else 
      this.result = "Você perdeu";
  }

}
