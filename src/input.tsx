import { parsePhoneNumber } from 'libphonenumber-js';
import type {Accessor, Component, Setter} from 'solid-js';
import metadata from 'libphonenumber-js/min/metadata'
import styles from './App.module.css';
import {createSignal, For, JSX, Show} from "solid-js";
import countries from "./public/countries";


interface Props {
    country:string,
    onChange:Setter<string>,
    value: Accessor<T>
    disabled?:boolean,
    readonly?: boolean,
    autocomplete?:string,

}
const App: (props: Props) => JSX.Element = (props: Props) => {

    let countryInput: HTMLOptionElement | ((el: HTMLOptionElement) => void) | undefined;
    const [number, setNumber] = createSignal('')
    const [dialCode, setDialCode] = createSignal(props.country ? countries.find((country)=> country.code === props.country.toUpperCase() )?.dial_code || '' : '')
    const findCountry = ( countrySelected:string)=>{
        const selectedCountry = countries.find((country)=>country.code===countrySelected)
        if( selectedCountry ) {
            setDialCode(selectedCountry.dial_code)
            props.onChange(`${selectedCountry.dial_code}${number()}`)
            // @ts-ignore
            countryInput.innerHTML = `${selectedCountry.emoji}`
            // @ts-ignore
            countryInput.selected = true
        }
    }

    const handleChangeNumber = (e) =>{
        setNumber(e.target.value)
        props.onChange(`${dialCode()}${e.target.value}`)
    }

  return (
    <div class={styles.containerInput}>
          <div >
              <select disabled={props.disabled} class={styles.select} onkeypress={(e)=>findCountry(`${e.target.value}`)} onChange={(e)=>findCountry(`${e.target.value}`)} name={'countryCode'}>
                  <For each={countries}>
                  {
                      (country)=> {
                          if(country.code === 'UN') return <option class={styles.selectedTransparentOption} ref={countryInput} value={country.code} selected>{`${ props.country ? countries.find((country)=> country.code === props.country.toUpperCase() )?.emoji || country.emoji : country.emoji}`}</option>

                          return(
                                    <option disabled={props.readonly ? true : false} value={country.code} onClick={()=>findCountry(country.code)}>{`${country.name}`}</option>
                          )
                      }
                  }
                </For>
              </select>
          </div>
          <input name={'phone'} autocomplete={props.autocomplete? props.autocomplete : 'tel'} disabled={props.disabled} readonly={props.readonly} class={styles.inputNumber} onKeyUp={(e)=>handleChangeNumber(e)} type='number' placeholder={'phone'}></input>

    </div>
  );
};

export default App;
