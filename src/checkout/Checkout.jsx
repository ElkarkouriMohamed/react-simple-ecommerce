import { useSelector } from "react-redux"

export default function Checkout() {
    const shoppingList = useSelector(state => state.shopping.shoppingList);

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        
                    </tr>
                </thead>
                <tbody>
                    {shoppingList.map((e, i) => (
                        <tr key={i}>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}