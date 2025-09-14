import React, { useState, useEffect, useMemo } from 'react';
import { 
  Plus, 
  Check, 
  X, 
  Trash2, 
  Edit3, 
  Calendar, 
  Clock, 
  Filter,
  Search,
  Star,
  Archive,
  ChevronDown,
  Sparkles,
  Target,
  TrendingUp
} from 'lucide-react';
import TodoItem from './components/TodoItem';
import TodoForm from './components/TodoForm';
import FilterBar from './components/FilterBar';
import StatsCard from './components/StatsCard';
import EmptyState from './components/EmptyState';

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [showForm, setShowForm] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todoData) => {
    const newTodo = {
      id: Date.now(),
      ...todoData,
      completed: false,
      starred: false,
      createdAt: new Date().toISOString(),
    };
    setTodos([newTodo, ...todos]);
    setShowForm(false);
  };

  const updateTodo = (id, updates) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, ...updates } : todo
    ));
    setEditingTodo(null);
    setShowForm(false);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const toggleStar = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, starred: !todo.starred } : todo
    ));
  };

  const filteredAndSortedTodos = useMemo(() => {
    let filtered = todos;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(todo => 
        todo.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (todo.description && todo.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply status filter
    switch (filter) {
      case 'active':
        filtered = filtered.filter(todo => !todo.completed);
        break;
      case 'completed':
        filtered = filtered.filter(todo => todo.completed);
        break;
      case 'starred':
        filtered = filtered.filter(todo => todo.starred);
        break;
      default:
        break;
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'priority':
          const priorityOrder = { high: 0, medium: 1, low: 2 };
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        case 'alphabetical':
          return a.text.localeCompare(b.text);
        case 'starred':
          return b.starred - a.starred;
        default: // date
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

    return sorted;
  }, [todos, filter, searchQuery, sortBy]);

  const stats = useMemo(() => ({
    total: todos.length,
    completed: todos.filter(t => t.completed).length,
    active: todos.filter(t => !t.completed).length,
    starred: todos.filter(t => t.starred).length,
  }), [todos]);

  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-surface/30">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <header className="mb-12 text-center animate-slide-down">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-2xl blur-xl opacity-50 animate-pulse-glow"></div>
              <div className="relative bg-gradient-to-r from-primary to-secondary p-4 rounded-2xl">
                <Target className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-5xl font-bold gradient-text">TaskFlow</h1>
          </div>
          <p className="text-textSecondary text-lg">Organisez votre vie avec style et efficacité</p>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <StatsCard
            icon={<Target className="w-5 h-5" />}
            label="Total des tâches"
            value={stats.total}
            color="primary"
          />
          <StatsCard
            icon={<Check className="w-5 h-5" />}
            label="Terminées"
            value={stats.completed}
            color="success"
          />
          <StatsCard
            icon={<Clock className="w-5 h-5" />}
            label="En cours"
            value={stats.active}
            color="secondary"
          />
          <StatsCard
            icon={<TrendingUp className="w-5 h-5" />}
            label="Progression"
            value={`${completionRate}%`}
            color="accent"
            progress={completionRate}
          />
        </div>

        {/* Action Bar */}
        <div className="glass-morphism rounded-2xl p-6 mb-8 animate-fade-in">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex-1 w-full lg:w-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-textSecondary" />
                <input
                  type="text"
                  placeholder="Rechercher des tâches..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-background/50 border border-border/50 rounded-xl focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
            </div>
            
            <div className="flex gap-3 w-full lg:w-auto">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 bg-background/50 border border-border/50 rounded-xl focus:outline-none focus:border-primary/50 transition-all cursor-pointer"
              >
                <option value="date">Trier par date</option>
                <option value="priority">Trier par priorité</option>
                <option value="alphabetical">Trier par ordre alphabétique</option>
                <option value="starred">Trier par favoris</option>
              </select>
              
              <button
                onClick={() => {
                  setEditingTodo(null);
                  setShowForm(true);
                }}
                className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 whitespace-nowrap"
              >
                <Plus className="w-5 h-5" />
                Ajouter une tâche
              </button>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <FilterBar 
          filter={filter} 
          setFilter={setFilter} 
          stats={stats}
        />

        {/* Todo Form Modal */}
        {showForm && (
          <TodoForm
            onSubmit={editingTodo ? (data) => updateTodo(editingTodo.id, data) : addTodo}
            onClose={() => {
              setShowForm(false);
              setEditingTodo(null);
            }}
            initialData={editingTodo}
          />
        )}

        {/* Todo List */}
        <div className="space-y-4">
          {filteredAndSortedTodos.length === 0 ? (
            <EmptyState filter={filter} searchQuery={searchQuery} />
          ) : (
            filteredAndSortedTodos.map((todo, index) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggleComplete={toggleComplete}
                onToggleStar={toggleStar}
                onEdit={(todo) => {
                  setEditingTodo(todo);
                  setShowForm(true);
                }}
                onDelete={deleteTodo}
                index={index}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
