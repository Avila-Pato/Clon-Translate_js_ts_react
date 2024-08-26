import { Form } from "react-bootstrap"
import { SectionType } from "../interface/types.d"


// creando los props

interface Props {
    type: SectionType
    loading?: boolean
    onChange: (value: string) => void
    value: string
}

const commonStyles = {border: 0, height: '300px', resize: 'none'}
const getPlaceholder = ({type, loading }: {type: SectionType, loading?:boolean}) => {
    if(type === SectionType.From) return 'Introducir texto'
    if(loading === true) return 'Cargando..'
    return 'Traduccion'
}

export const TextArea = ({type, loading, value, onChange}: Props) => {
 const styles = type === SectionType.From
        ? {commonStyles}
        : {...commonStyles, backgroundColor: '#f5f5f5'}

const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value)
}

    return (
        <Form.Control 
        autoFocus={type === SectionType.From}
        as="textarea" // que elemento redneriza
        placeholder={getPlaceholder({type, loading})}
        style={styles}
        value={value}
        onChange={handleChange}
        />
    )
}