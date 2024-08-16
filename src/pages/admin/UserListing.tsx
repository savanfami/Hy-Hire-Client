import React, { Key, useEffect, useState } from 'react'
import { SearchBar } from '../../components/admin/SeachBar'
import axios from 'axios';
import { URL } from '../../common/axiosInstance'
import { config } from '../../common/configurations';
import moment from 'moment'


interface User {
    createdAt: string;
    _id: number ;
    name: string;
    email: string;
    role: string;
    isBlocked: Boolean
}

const formatDate = (dateString: string): string => {
    return moment(dateString).format('MMMM Do, YYYY, h:mm A');
  };

const UserListing = () => {
    const [users, setUsers] = useState<User[]>([]);
    console.log(users, 'users')

    const fetchUsers = async () => {
        try {
            const { data } = await axios.get(`${URL}/user/get-alluser`, config);
            // console.log(data?.data, 'response=>>>>>>from get all user')
            return data;
        } catch (error) {
            console.error('Error fetching users:', error);
            return [];
        }
    };

    useEffect(() => {
        fetchUsers().then(data => setUsers(data.data));
    }, []);


    function onBlockUnblock(_id: number): void {
        alert('button clicked')
        throw new Error('Function not implemented.');
    }

    return (
        <>

            <SearchBar value={`Total Users: ${users.length}`} />

            <table className="min-w-full bg-white border border-gray-300 shadow-sm rounded-lg overflow-hidden font-serif font-medium">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined at</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{formatDate(user.createdAt)}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={` inline-flex text-xs leading-5 p-2 font-semibold rounded-full ${user.isBlocked ? 'bg-red-100 text-red-800': 'bg-green-100 text-green-800' }`}>
                                    {user.isBlocked ? 'Blocked' : 'active'}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <button
                                    onClick={() => onBlockUnblock(user._id)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium text-white ${user.isBlocked ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}
                                >
                                    {user.isBlocked ? 'Unblock' : 'block'}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>


        </>


    )
}

export default UserListing