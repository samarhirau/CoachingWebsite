import React, { useMemo } from 'react';
import { DollarSign, FileText } from 'lucide-react';



interface FeesReceiptItem {
  id: number;
  feesType: 'Annual Fees' | 'Tuition Fees';
  frequency: 'Monthly' | 'Yearly';
  invoiceNumber: string;
  date: string;
  amount: number;
}

const initialFeesReceipt: FeesReceiptItem[] = [
  { id: 1, feesType: 'Annual Fees', frequency: 'Monthly', invoiceNumber: '#54820', date: '8 August 2021', amount: 999.00 },
  { id: 2, feesType: 'Annual Fees', frequency: 'Yearly', invoiceNumber: '#54310', date: '7 August 2021', amount: 3000.00 },
  { id: 3, feesType: 'Tuition Fees', frequency: 'Monthly', invoiceNumber: '#24315', date: '6 August 2021', amount: 499.00 },
  { id: 4, feesType: 'Tuition Fees', frequency: 'Yearly', invoiceNumber: '#32541', date: '5 August 2021', amount: 3999.00 },
];









const FeesReceiptView: React.FC<{ data: typeof initialFeesReceipt }> = ({ data }) => {
    const subtotal = useMemo(() => data.reduce((sum, item) => sum + item.amount, 0), [data]);
    const discount = subtotal * 0.20;
    const subtotalAfterDiscount = subtotal - discount;
    const vat = subtotalAfterDiscount * 0.10;
    const total = subtotalAfterDiscount + vat;

    const formatCurrency = (amount: number) => `$${amount.toFixed(2)}`;

    return (
        <div className="p-6">
            <div className="bg-white p-8 rounded-xl shadow-lg max-w-5xl mx-auto">
                <header className="flex justify-between items-center border-b pb-4 mb-6">
                    <h2 className="text-3xl font-bold text-gray-800">Invoice / Fees Receipt</h2>
                    <div className="text-right">
                        <p className="text-sm text-gray-500">Date: 01/12/2023</p>
                        <p className="font-semibold text-yellow-600">Status: Pending</p>
                    </div>
                </header>

                <div className="grid grid-cols-2 gap-8 mb-8 text-gray-700">
                    <div>
                        <h4 className="font-bold text-lg mb-2 text-indigo-700">Billed From: Upcoder (School Admin)</h4>
                        <p>Upcoder Education</p>
                        <p>#8801 Address Line, City</p>
                        <p>Email: info@Upcoder.com</p>
                        <p>Phone: +91 123 456 7890</p>
                    </div>
                    <div className="text-right">
                        <h4 className="font-bold text-lg mb-2 text-indigo-700">Billed To: Bob Mart (Student Name)</h4>
                        <p>Danial Marek</p>
                        <p>#8901 Address Line, City</p>
                        <p>Email: bob@example.com</p>
                        <p>Phone: +91 098 765 4321</p>
                    </div>
                </div>

                <div className="overflow-x-auto mb-8">
                    <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">#</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fees Type</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Frequency</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Invoice No.</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {data.map((item, index) => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{index + 1}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.feesType}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.frequency}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-600">{item.invoiceNumber}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-right">{formatCurrency(item.amount)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-end">
                    <div className="w-full sm:w-80 space-y-2 text-gray-700">
                        <div className="flex justify-between">
                            <span>Subtotal:</span>
                            <span className="font-semibold">{formatCurrency(subtotal)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Discount (20%):</span>
                            <span className="font-semibold text-red-500">-{formatCurrency(discount)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>VAT (10%):</span>
                            <span className="font-semibold text-green-500">+{formatCurrency(vat)}</span>
                        </div>
                        <div className="flex justify-between pt-3 border-t-2 border-indigo-200">
                            <span className="text-xl font-bold text-indigo-700">Total Due:</span>
                            <span className="text-xl font-bold text-indigo-700">{formatCurrency(total)}</span>
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex justify-center space-x-4">
                    <button className="flex items-center px-6 py-3 bg-indigo-500 text-white font-semibold rounded-xl shadow-md hover:bg-indigo-600 transition">
                        <DollarSign className="w-5 h-5 mr-2" /> Proceed to Payment
                    </button>
                    <button className="flex items-center px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-100 transition">
                        <FileText className="w-5 h-5 mr-2" /> Print Receipt
                    </button>
                </div>
            </div>
        </div>
    );
};



export default FeesReceiptView;