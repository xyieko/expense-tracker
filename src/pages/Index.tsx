
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ExpenseTable from "@/components/ExpenseTable";
import ExpenseForm from "@/components/ExpenseForm";
import SearchBar from "@/components/SearchBar";
import { Expense } from "@/types/expense";
import { sampleExpenses } from "@/data/sample-expenses";
import { Separator } from "@/components/ui/separator";

const Index = () => {
  const [expenses, setExpenses] = useState<Expense[]>(sampleExpenses);
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddExpense = (newExpense: Expense) => {
    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== id));
  };

  // Filter expenses based on search term
  const filteredExpenses = expenses.filter((expense) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      expense.name.toLowerCase().includes(searchLower) ||
      expense.description.toLowerCase().includes(searchLower) ||
      expense.category.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="container py-10 mx-auto max-w-screen-xl">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold">Expense Tracker</h1>
        <p className="text-muted-foreground mt-2">Keep track of your spending habits</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <ExpenseForm onAddExpense={handleAddExpense} />
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Your Expenses</CardTitle>
              <Separator className="my-3" />
              <SearchBar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
              />
            </CardHeader>
            <CardContent>
              <ExpenseTable 
                expenses={filteredExpenses} 
                onDeleteExpense={handleDeleteExpense} 
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
