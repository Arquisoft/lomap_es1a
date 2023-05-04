import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../pages/Home";
import Map from "../components/home/SideForm";
import App from "../App";
import SideForm from "../components/home/SideForm";
import MarkerInfo from "../components/home/MarkerInfo";
import Filter from "../components/home/Filter";
import AddLocationModal from "../components/home/AddLocationModal";

describe("Home component", () => {
  test("renders sideform", () => {
    render(<SideForm show={true} setOpen={() => {}} showNotification={() => {}} reloadMap={() => {}}/>);
    const title = screen.getByText("Add a location");
    expect(title).toBeInTheDocument();
  });

  test("renders markerinfo", () => {
    render(<MarkerInfo show={true} location={undefined} setOpen={(state:boolean) => {}} openModal={() => {}} cardList={undefined}/>)
    const button = screen.getByText("Add info");
    expect(button).toBeInTheDocument();
  })

  test("renders filter", () => {
    render(<Filter toggleFriends={true} reloadMap={(category:string) => {}} toggleFilter={() => {}}/>)
  }) 

  test("renders addLocationModal", () => {
    render(<AddLocationModal modalIsOpen={true} redirectToLogin={false} closeModal={() =>{}} showNotification={() => {}} selectedLocation={undefined} />)
  })

});
