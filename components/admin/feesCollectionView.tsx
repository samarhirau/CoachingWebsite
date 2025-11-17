
import React from 'react';
import { Edit, FileText } from 'lucide-react';



interface FeesCollectionItem {
    id: number;
    rollNo: string;
    studentName: string;
    invoiceNumber: string;
    feesType: 'Library' | 'Tuition' | 'Annual';
    paymentType: 'Cash' | 'Credit Card' | 'Cheque';
    status: 'Paid' | 'Pending' | 'Unpaid';
    date: string;
    amount: number;
}


const FeesCollectionView: React.FC<{ data: FeesCollectionItem[] }> = ({ data }) => {
    const getStatusClass = (status: FeesCollectionItem['status']) => {
        switch (status) {
            case 'Paid': return 'bg-green-100 text-green-800 font-bold';
            case 'Pending': return 'bg-yellow-100 text-yellow-800 font-bold';
            case 'Unpaid': return 'bg-red-100 text-red-800 font-bold';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Fees Collection</h2>
            <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                    <div className="text-sm text-gray-600">
                        Show
                        <select className="mx-2 p-1 border rounded-md bg-white">
                            <option>10</option>
                            <option>25</option>
                            <option>50</option>
                        </select>
                        entries
                    </div>
                    <input
                        type="search"
                        placeholder="Search..."
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                    />
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                {['Roll No.', 'Student Name', 'Invoice Number', 'Fees Type', 'Payment Type', 'Status', 'Date', 'Amount', 'Actions'].map(header => (
                                    <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {data.map(item => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.rollNo}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.studentName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-600">{item.invoiceNumber}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.feesType}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.paymentType}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(item.status)}`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-800">${item.amount.toFixed(2)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button title="View Receipt" className="text-blue-500 hover:text-blue-700 transition mr-2"><FileText className="w-4 h-4" /></button>
                                        <button title="Edit" className="text-indigo-500 hover:text-indigo-700 transition"><Edit className="w-4 h-4" /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};


export default FeesCollectionView;