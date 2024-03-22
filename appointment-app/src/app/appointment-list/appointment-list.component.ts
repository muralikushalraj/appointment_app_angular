import { Component } from '@angular/core';
import { Appointment } from "../models/appointment";

import { OnInit } from "@angular/core";
@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {
  newAppointmentDesc: string = ""
  newAppointmentDate: Date = new Date()

  appointments: Appointment[] = []

  ngOnInit(): void {
    this.loadAppointments()
  }

  loadAppointments(){
    let savedAppointments = localStorage.getItem("appointments")
    this.appointments = savedAppointments ? JSON.parse(savedAppointments) : []
  }

  addAppointment() {
    if (this.newAppointmentDesc.trim().length && this.newAppointmentDate) {
      debugger
      var maxIdAppointment = this.appointments.sort(function (a, b) {
        return b.id - a.id
      })
      var maxId = maxIdAppointment.length === 0 ? 0 : maxIdAppointment[0].id
    
      let newAppointment: Appointment = {
        id: maxId + 1,
        title: this.newAppointmentDesc,
        date: this.newAppointmentDate
      }

      this.appointments.push(newAppointment)

      this.newAppointmentDesc = ""
      this.newAppointmentDate = new Date()

      localStorage.setItem("appointments", JSON.stringify(this.appointments))
    }
  }
  deleteAppointment(id: number) {
    var filteredAppointment = this.appointments.filter(item => item.id !== id)
    localStorage.setItem("appointments", JSON.stringify(filteredAppointment))
    this.loadAppointments()
  }
}
