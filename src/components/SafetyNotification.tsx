interface SimpleNotificationProps {
	message: string;
}

export function SimpleNotification({ message }: SimpleNotificationProps) {
	return (
		<div className="border border-red-200 bg-red-50 text-red-800 rounded-lg p-3 mb-4 flex items-start gap-2">
			<p className="text-sm flex-1">{message}</p>
		</div>
	);
}
