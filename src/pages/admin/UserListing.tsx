import React, { Key, useEffect, useState } from 'react'
import { SearchBar } from '../../components/admin/SeachBar'
import axios from 'axios';
import { URL } from '../../common/axiosInstance'
import { config } from '../../common/configurations';
import moment from 'moment'
import Swal from 'sweetalert2';

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

    const fetchUsers = async () => {
        try {
            const { data } = await axios.get(`${URL}/user/get-alluser`, config);
            return data;
        } catch (error) {
            console.error('Error fetching users:', error);
            return [];
        }
    };

    useEffect(() => {
        fetchUsers().then(data => setUsers(data.data));
    }, []);


    const onBlockUnblock = async (userId: number, currentBlockStatus: Boolean) => {
        const action = currentBlockStatus ? 'unblock' : 'block';
        
        const result = await Swal.fire({
            title: `Are you sure?`,
            text: `Do you want to ${action} this user?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: `Yes, ${action} user!`
        });

       
        if (result.isConfirmed) {
            try {
                await axios.put(`${URL}/auth/block-unblock/${userId}`);
                
             
                setUsers(prevUsers => prevUsers.map(user => 
                    user._id === userId ? { ...user, isBlocked: !user.isBlocked } : user
                ));


                Swal.fire(
                    'Success!',
                    `User has been ${action}ed.`,
                    'success'
                );
            } catch (error) {
                console.error('Error blocking/unblocking user:', error);
                
         
                Swal.fire(
                    'Error!',
                    `Failed to ${action} user. Please try again.`,
                    'error'
                );
            }
        }
    };

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
                                <span className={` inline-flex text-xs leading-5 p-2 font-semibold rounded-full ${user.isBlocked===false ? 'bg-green-100 text-green-800': 'bg-red-100 text-red-800' }`}>
                                    {user.isBlocked===true? 'Blocked' : 'active'}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <button
                                    onClick={() => onBlockUnblock(user._id,user.isBlocked)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium text-white ${user.isBlocked===false ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
                                >
                                    {user.isBlocked===true ? 'Unblock' : 'block'}
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