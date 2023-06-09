import { isValidPhoneNumber } from 'libphonenumber-js';
import type {Accessor, Component, Setter} from 'solid-js';
import metadata from 'libphonenumber-js/min/metadata'
import styles from './App.module.css';
import {createEffect, createSignal, For, JSX, Show} from "solid-js";
import countries from "./public/countries";
import Input from "./input";


interface Props {
    country:string,
    onChange:Setter<null>,
    value: Accessor<null>

}
const App: (props: Props) => JSX.Element = (props: Props) => {

  const [value, setValue] = createSignal();
  createEffect(()=>{
        console.log(value())

  })
  return (
    <input country={'br'} onChange={setValue} value={value} />
  );
};

export default App;
