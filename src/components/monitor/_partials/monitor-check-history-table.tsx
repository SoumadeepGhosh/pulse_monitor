import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const history = [
  {
    time: "10:00",
    status: "UP",
    statusCode: 200,
    responseTime: 120,
  },
  {
    time: "10:05",
    status: "UP",
    statusCode: 200,
    responseTime: 130,
  },
  {
    time: "10:10",
    status: "DOWN",
    statusCode: 503,
    responseTime: 2500,
  },
];

export function CheckHistoryTable() {
  return (
    <div className="rounded-xl border bg-card">
      <div className="border-b p-4">
        <h2 className="font-semibold">Check History</h2>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Time</TableHead>

            <TableHead>Status</TableHead>

            <TableHead>Status Code</TableHead>

            <TableHead>Response Time</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {history.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.time}</TableCell>

              <TableCell>{item.status}</TableCell>

              <TableCell>{item.statusCode}</TableCell>

              <TableCell>
                {item.responseTime}
                ms
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
