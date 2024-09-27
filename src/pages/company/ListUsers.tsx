import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import { config } from "../../common/configurations"
import axios from "axios"
import { URL } from "../../common/axiosInstance"
import { useEffect, useState } from "react"
import { SearchBar } from "../../components/admin/SeachBar"

export const ListUsers = () => {

    const [users, SetUsers] = useState<any>([])
    const [searchQuery, setSearchQuery] = useState<string>('');
    const handleSearch = (query: string) => {
        setSearchQuery(query)
    }
    const fetchData = async () => {
        try {
            const res = await axios.get(`${URL}/job/get-alluser`, config)
            console.log(res)
            if (res && res.data) {
                SetUsers(res.data);
            } else {
                console.log('no user found')
            }
        } catch (error: any) {
            console.error("Error fetching users:", error);
        }
    }

    useEffect(() => {
        fetchData()
    }, [])
    return (
        <div>
            <SearchBar values="Search Users" onSearch={handleSearch} />
            <table className="min-w-full bg-white border border-gray-300 shadow-sm rounded-lg overflow-hidden font-serif font-medium">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profic Pic</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> Details</th>
                        {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">connect</th> */}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {users && users?.length > 0 ? (
                        users.map((data: any, index: number) => (
                            <tr key={index}>
                                <td className='px-6 py-4 whitespace-nowrap'><img src={data?.image} className="w-16 h-16 rounded-md" alt="profile image" /></td>
                                <td className='px-6 py-4 whitespace-nowrap'>{data.name}</td>
                                <td className=' py-4 whitespace-nowrap'>{data.location}</td>
                                <button className='p-2 bg-maincolr text-white rounded-md mt-9 w-28'>show</button>
                            </tr>
                        ))
                    ) : (
                        <div>
                            <p>no data found</p>
                        </div>
                    )}
                </tbody>
            </table>
        </div>
    )
}


