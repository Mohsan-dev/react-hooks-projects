import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { GlobalContext } from "../../context";
import { useNavigate } from "react-router-dom";


export default function Navbar() {

    const {searchParam, setSearchParam ,handleSubmit} = useContext(GlobalContext)

    const navigate = useNavigate()

    console.log((searchParam));
        async function onSubmit(event) {
        await handleSubmit(event)
        navigate("/")
    }


    return <nav className="flex justify-between items-center py-8 container mx-auto flex-col lg:flex-row gap-5 lg:gap-0">
        <h2 className="text-2xl pl-4 font-semibold"><li>
                <NavLink to={"/"} 
                >
                FoodRecipe
                </NavLink>
            </li></h2>
        <form  onSubmit={onSubmit}>
            <input type="text"
                name="search"
                placeholder="Enter Item.."
                value={searchParam}
                onChange={(event)=>setSearchParam(event.target.value)}
                className="bg-white p-3 px-8 rounded-full outline-none lg:w-96 shadow-lg focus:shadow-red-200"
            />
        </form>
        <ul className="flex gap-5">
            <li>
                <NavLink to={"/"} 
                className="text-black hover:text-gray-700 duration-300">
                Home
                </NavLink>
            </li>
            <li>
                <NavLink to={"/favorites"} 
                className="text-black hover:text-gray-700 duration-300">
                Favourites
                </NavLink>
            </li>
        </ul>
    </nav>
}