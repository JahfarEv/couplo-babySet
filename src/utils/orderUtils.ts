export function getOrderStatusColor(status: string): string {
  const statusMap: Record<string, string> = {
    'pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'confirmed': 'bg-blue-100 text-blue-800 border-blue-200',
    'shipped': 'bg-purple-100 text-purple-800 border-purple-200',
    'delivered': 'bg-emerald-100 text-emerald-800 border-emerald-200',
    'cancelled': 'bg-red-100 text-red-800 border-red-200',
  };
  return statusMap[status] || 'bg-gray-100 text-gray-800 border-gray-200';
}

export function getOrderStatusLabel(status: string): string {
  const statusMap: Record<string, string> = {
    'pending': 'Pending',
    'confirmed': 'Confirmed',
    'shipped': 'Shipped',
    'delivered': 'Delivered',
    'cancelled': 'Cancelled',
  };
  return statusMap[status] || status;
}