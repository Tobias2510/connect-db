"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DatabaseParams } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Check, Copy, Eye, EyeClosed } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "sonner";

const databases = [
  { name: "PostgreSQL", color: "from-blue-500 to-blue-700" },
  { name: "MySQL", color: "from-yellow-500 to-yellow-700" },
  { name: "MongoDB", color: "from-green-500 to-green-700" },
  { name: "SQLite", color: "from-gray-500 to-gray-700" },
  { name: "Microsoft SQL Server", color: "from-indigo-500 to-indigo-700" },
  { name: "Oracle", color: "from-orange-500 to-orange-700" },
  { name: "Redis", color: "from-red-500 to-red-700" },
  { name: "Cassandra", color: "from-purple-500 to-purple-700" },
  // { name: "IBM Db2", color: "from-blue-600 to-blue-800" },
  // { name: "ClickHouse", color: "from-pink-500 to-pink-700" },
  // { name: "Elasticsearch", color: "from-yellow-600 to-yellow-800" },
  // { name: "Amazon Redshift", color: "from-red-600 to-red-800" },
  // { name: "Google BigQuery", color: "from-blue-400 to-blue-600" },
  // { name: "Teradata", color: "from-teal-500 to-teal-700" },
  // { name: "SAP HANA", color: "from-yellow-400 to-yellow-600" },
  // { name: "Firebird", color: "from-red-400 to-red-600" },
  // { name: "Sybase ASE", color: "from-purple-600 to-purple-800" },
  // { name: "SAP SQL Anywhere", color: "from-green-600 to-green-800" },
  // { name: "Microsoft Access", color: "from-indigo-600 to-indigo-800" },
];

export default function StringGenerator() {
  const [copied, setCopied] = useState<boolean>(false);
  const [databaseType, setDatabaseType] = useState<string>();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [connectionString, setConnectionString] = useState<string>("");
  const [databaseParams, setDatabaseParams] = useState<DatabaseParams>({
    username: "",
    password: "",
    domain: "",
    database: "",
    port: "",
  });

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setDatabaseParams((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  }

  function generateConnectionString(): string {
    const { username, password, domain, database, port } = databaseParams;
    switch (databaseType) {
      case "PostgreSQL":
        return `postgresql://${username}:${password}@${domain}:${port !== "" ? port : 5432}/${database}`;
      case "MySQL":
        return `mysql://${username}:${password}@${domain}:${port !== "" ? port : 3306}/${database}`;
      case "MongoDB":
        return `mongodb://${username}:${password}@${domain}:${port !== "" ? port : 27017}/${database}`;
      case "SQLite":
        return `${database}.db`;
      case "Microsoft SQL Server":
        return `mssql://${username}:${password}@${domain}:${port !== "" ? port : 1433}/${database}`;
      case "Oracle":
        return `oracle://${username}:${password}@${domain}:${port !== "" ? port : 1521}/${database}`;
      case "Redis":
        return `redis://${username}:${password}@${domain}:${port !== "" ? port : 6379}`;
      case "Cassandra":
        return `cassandra://${username}:${password}@${domain}:${port !== "" ? port : 9042}/${database}`;
      // case "IBM Db2":
      //   return `db2://${username}:${password}@${domain}:50000/${database}`;
      // case "ClickHouse":
      //   return `clickhouse://${username}:${password}@${domain}:8123/${database}`;
      // case "Elasticsearch":
      //   return `https://${username}:${password}@${domain}:9200`;
      // case "Amazon Redshift":
      //   return `redshift://${username}:${password}@${domain}:5439/${database}`;
      // case "Google BigQuery":
      //   return `bigquery://${domain}/${database}`;
      // case "Teradata":
      //   return `teradata://${username}:${password}@${domain}/${database}`;
      // case "SAP HANA":
      //   return `hana://${username}:${password}@${domain}:30015/${database}`;
      // case "Firebird":
      //   return `firebird://${username}:${password}@${domain}:3050/${database}`;
      // case "Sybase ASE":
      //   return `sybase://${username}:${password}@${domain}:5000/${database}`;
      // case "SAP SQL Anywhere":
      //   return `sqlanywhere://${username}:${password}@${domain}:2638/${database}`;
      // case "Microsoft Access":
      //   return `access://${database}`;
      default:
        return "Select a database to generate a connection string";
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(connectionString);
    toast.success("Connection string copied to clipboard!");
    setCopied(true);
    setTimeout(() => setCopied(false), 4000);
  }

  useEffect(() => {
    if (databaseType) {
      setConnectionString(generateConnectionString());
    }
  }, [databaseType, databaseParams]);

  const maskedConnectionString = connectionString.replace(
    /^(.+?:\/\/[^:]+:)([^@]+)(@.*)$/,
    (_, prefix, __, suffix) => `${prefix}*****${suffix}`,
  );

  return (
    <>
      <div className="flex flex-wrap gap-3">
        {databases.map((db, index) => (
          <Button
            key={index}
            onClick={() => setDatabaseType(db.name)}
            className={cn(
              `rounded-full bg-gradient-to-tr text-white ${db.color}`,
              db.name === databaseType && "ring-2 ring-black dark:ring-white",
            )}
          >
            {db.name}
          </Button>
        ))}
      </div>
      <Card className="dark:bg-transparent">
        <CardHeader>
          <CardTitle>Your data</CardTitle>
          <CardDescription>Write your database data!</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          {databaseType !== "SQLite" ? (
            <div className="md flex flex-wrap gap-6">
              <div>
                <Label htmlFor="username" className="mb-1.5">
                  Username
                </Label>
                <Input
                  id="username"
                  className="w-fit"
                  value={databaseParams.username}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="password" className="mb-1.5">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className="box-border w-fit pr-8"
                    value={databaseParams.password}
                    onChange={handleChange}
                  />
                  <Button
                    variant={"ghost"}
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute top-0 right-0 z-10"
                  >
                    {showPassword ? <Eye /> : <EyeClosed />}
                  </Button>
                </div>
              </div>
              <div>
                <Label htmlFor="domain" className="mb-1.5">
                  Domain/IP
                </Label>
                <Input
                  id="domain"
                  className="w-fit"
                  value={databaseParams.domain}
                  onChange={handleChange}
                />
              </div>
              <div className={cn(databaseType === "Redis" && "hidden")}>
                <Label htmlFor="database" className="mb-1.5">
                  Database
                </Label>
                <Input
                  id="database"
                  className="w-fit"
                  value={databaseParams.database}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="port" className="mb-1.5">
                  Port (optional)
                </Label>
                <Input
                  id="port"
                  type="number"
                  className="w-fit"
                  value={databaseParams.port}
                  onChange={handleChange}
                />
              </div>
            </div>
          ) : (
            <div>
              <Label htmlFor="database" className="mb-1.5">
                Path
              </Label>
              <Input
                id="database"
                className="w-fit"
                value={databaseParams.database}
                onChange={handleChange}
              />
            </div>
          )}
          <div className="relative">
            <Textarea
              value={showPassword ? connectionString : maskedConnectionString}
              readOnly
              className="bg-slate-200 dark:bg-slate-800"
            />
            <Button
              variant={"outline"}
              onClick={handleCopy}
              className="absolute top-3 right-3"
            >
              {copied ? <Check /> : <Copy />}
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
