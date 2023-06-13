# Wizard 

The **solid-phone-number-input** component is a component inspired on the library **react-phone-number-input** from **catamphetamine** that includes a select with 242 countries with their respective flags and returns their iso code + the number used on the phone input

![](https://media.discordapp.net/attachments/1077350703443492987/1118269148103975073/image.png)

# Get started

It is very easy to use the phone input component. You can do this in just a few simple steps:

### Instalation
If you are using npm:

    npm i @digichanges/solid-phone-number-input
Or if you are using pnpm:

    pnpm i @digichanges/solid-phone-number-input

### Usage.

1 - Import the component.

    '@digichanges/solid-phone-number-input/src/App';

2 - The phone input must be inside a parent element that has a state, which will allow you to have access to the component value.

3 - Add the required props value and onChange, which should be the state previously added:

![](https://media.discordapp.net/attachments/1077350703443492987/1118269942467412048/image.png)

If you do a console.log of the **state** value, you will see the value of the input changing dynamically:

![](https://media.discordapp.net/attachments/1077350703443492987/1118270616529805372/image.png)

### Props

| Name                       | Function                                                                       | Required |
|----------------------------|--------------------------------------------------------------------------------|----------|
| value              | Is an accesor that tells the component the actual value of the input           | ✅        |
| onChange                 | A setter that allows the component to change its value.                        | ✅        |
| disabled | 	Set to true to mark both the phone number input and the country select as disabled. | ❌     |
| readOnly | 	Set to true to mark both the phone number input and the country select as readonly. | ❌     |
| autoComplete | 	Sets autoComplete property for phone number input.                            | ❌     |
| className | 	<Phone/> component CSS class.                                                 | ❌     |
| style | 	<Phone/> component style object.                                              | ❌     |
| countrySelectComponent | Country select component. Receive properties: {className, style}               | ❌     |

