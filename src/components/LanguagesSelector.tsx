import { Form } from "react-bootstrap";
import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from "../languages/constanst";
import React from "react";
import { FromLanguage, Language, SectionType } from "../interface/types.d";
// import { type FC } from "react";


// interface Props {
//     onchange: (language: Language) => void;
// }

type Props = 
| {type: SectionType.From, value: FromLanguage,onchange: (language: FromLanguage) => void}
| {type: SectionType.To, value: Language,onchange: (language: Language) => void}


export const LanguageSelector = ({ onchange, type, value }: Props)  => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onchange(event.target.value as Language);
    }
    return (
        <Form.Select aria-label="Selecciona el idioma" onChange={handleChange} value={value}>
            {/* Si el el type es igual al from y el value es igual a AUTO_LANGUAGE detecta el idiomna AUTO_LANGUAGE y lo pone como primer valor del select  */}
            {type === SectionType.From && (
                <option value={AUTO_LANGUAGE}>Auto</option>
            )}
            {Object.entries(SUPPORTED_LANGUAGES).map(([key, literal ]) => (
                <option key={key} value={key}>
                    {literal}
                </option>
            ))}
        </Form.Select>
    )
}