import type {Accessor, Setter} from 'solid-js';
import styles from './App.module.css';
import {createEffect, createSignal, For, JSX, Show} from "solid-js";
import countries from "./public/countries";

interface selectProps{
    selectClassName:string,
    containerClassName:string,
}
interface Props {
    country?:string,
    onChange:Setter<string>,
    value: Accessor<T>
    disabled?:boolean,
    readonly?: boolean,
    autocomplete?:string,
    className?:string,
    style?:any,
    countrySelectComponent?:selectProps;


}
const App: (props: Props) => JSX.Element = (props: Props) => {

    let phoneInput: HTMLInputElement | ((el: HTMLInputElement) => void) | undefined;
    let divIcon:  HTMLDivElement | ((el: HTMLDivElement) => void) | undefined
    const [number, setNumber] = createSignal('')
    const [dialCode, setDialCode] = createSignal(props.country ? countries.find((country)=> country.code === props.country.toUpperCase() )?.dial_code || '' : '')
    const findCountry = ( countrySelected:string)=>{
        const selectedCountry = countries.find((country)=>country.code===countrySelected)
        if( selectedCountry ) {
            setDialCode(selectedCountry.dial_code)
            props.onChange(`${selectedCountry.dial_code}${number()}`)
            // @ts-ignore
            divIcon.innerHTML = `${selectedCountry.emoji}`
            // @ts-ignore
        }
    }


    createEffect(()=>{
           if(!props.value()) {
               // @ts-ignore
               divIcon.innerHTML = '';
               // @ts-ignore
               divIcon.appendChild(countries.find((country) => country.code === 'UN')?.emoji)
               // @ts-ignore
               phoneInput.value = ''
               }
    })
    const handleChangeNumber = (e) =>{
        setNumber(e.target.value)
        props.onChange(`${dialCode()}${e.target.value}`)
    }

  return (
    <div class={styles.containerInput}>
          <div class={`${styles.containerInputs} ${props.countrySelectComponent?.containerClassName || ''}`}>
              <div ref={divIcon}>{ props.country ? countries.find((country)=> country.code === props.country.toUpperCase() )?.emoji || countries.find((country)=> country.code === 'UN' )?.emoji : countries.find((country)=> country.code === 'UN' )?.emoji }</div>
              <select disabled={props.disabled} class={`${styles.select} ${props.countrySelectComponent?.selectClassName || ''}`} onkeypress={(e)=>findCountry(`${e.target.value}`)} onChange={(e)=>findCountry(`${e.target.value}`)} name={'countryCode'}>
                  <For each={countries}>
                  {
                      (country)=> {
                          if(country.code === 'UN') return <option class={styles.selectedTransparentOption} value={country.code} selected></option>

                          return(
                                    <option disabled={props.readonly ? true : false} value={country.code} onClick={()=>findCountry(country.code)}>{`${country.name}`}</option>
                          )
                      }
                  }
                </For>
              </select>
          </div>
          <input ref={phoneInput} name={'phone'} autocomplete={props.autocomplete? props.autocomplete : 'tel'} disabled={props.disabled} readonly={props.readonly} class={`${styles.inputNumber} ${props.className || ''}`} style={props.style || ''} onKeyUp={(e)=>handleChangeNumber(e)} type='number' placeholder={'phone'}></input>

    </div>
  );
};

export default App;
