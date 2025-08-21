import React, {
  useState,
  useCallback,
  useMemo,
  useEffect,
  Suspense,
  lazy,
} from "react";

// Mock icons to avoid external dependency
const Search = ({
  size = 24,
  className = "",
}: {
  size?: number;
  className?: string;
}) => (
  <svg
    width={size}
    height={size}
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const RefreshCw = ({
  size = 24,
  className = "",
}: {
  size?: number;
  className?: string;
}) => (
  <svg
    width={size}
    height={size}
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
    <path d="M21 3v5h-5" />
    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
    <path d="M3 21v-5h5" />
  </svg>
);

const Plus = ({
  size = 24,
  className = "",
}: {
  size?: number;
  className?: string;
}) => (
  <svg
    width={size}
    height={size}
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const Eye = ({
  size = 24,
  className = "",
}: {
  size?: number;
  className?: string;
}) => (
  <svg
    width={size}
    height={size}
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const Edit = ({
  size = 24,
  className = "",
}: {
  size?: number;
  className?: string;
}) => (
  <svg
    width={size}
    height={size}
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const Trash2 = ({
  size = 24,
  className = "",
}: {
  size?: number;
  className?: string;
}) => (
  <svg
    width={size}
    height={size}
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <polyline points="3,6 5,6 21,6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </svg>
);

// ===== DOMAIN LAYER (Clean Architecture) =====
interface User {
  readonly id: UserId;
  readonly email: Email;
  readonly name: UserName;
  readonly role: UserRole;
  readonly createdAt: Date;
  readonly isActive: boolean;
}

type UserId = string & { readonly brand: unique symbol };
type Email = string & { readonly brand: unique symbol };
type UserName = string & { readonly brand: unique symbol };
type UserRole = "ADMIN" | "USER" | "MODERATOR";

// Domain Events (Event Sourcing pattern) -示例接口，在实际项目中会被使用
// interface DomainEvent {
//   readonly id: string;
//   readonly aggregateId: string;
//   readonly eventType: string;
//   readonly payload: unknown;
//   readonly occurredAt: Date;
// }

// ===== APPLICATION LAYER (Use Cases) =====
interface UserRepository {
  findAll(filters: UserFilters): Promise<PaginatedResult<User>>;
  findById(id: UserId): Promise<User | null>;
  save(user: User): Promise<void>;
  delete(id: UserId): Promise<void>;
}

interface UserFilters {
  readonly search?: string;
  readonly role?: UserRole;
  readonly isActive?: boolean;
  readonly page: number;
  readonly limit: number;
}

interface PaginatedResult<T> {
  readonly items: readonly T[];
  readonly total: number;
  readonly page: number;
  readonly totalPages: number;
}

// ===== INFRASTRUCTURE LAYER =====
class HttpUserRepository implements UserRepository {
  async findAll(filters: UserFilters): Promise<PaginatedResult<User>> {
    // Simulate API call with proper error handling
    await new Promise((resolve) =>
      setTimeout(resolve, Math.random() * 1000 + 500)
    );

    const mockUsers: User[] = Array.from({ length: 50 }, (_, i) => ({
      id: `user-${i}` as UserId,
      email: `user${i}@company.com` as Email,
      name: `User ${i}` as UserName,
      role: (["ADMIN", "USER", "MODERATOR"] as const)[i % 3],
      createdAt: new Date(Date.now() - Math.random() * 10000000000),
      isActive: Math.random() > 0.2,
    }));

    let filtered = mockUsers;

    if (filters.search) {
      const search = filters.search.toLowerCase();
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(search) ||
          user.email.toLowerCase().includes(search)
      );
    }

    if (filters.role) {
      filtered = filtered.filter((user) => user.role === filters.role);
    }

    if (filters.isActive !== undefined) {
      filtered = filtered.filter((user) => user.isActive === filters.isActive);
    }

    const startIndex = (filters.page - 1) * filters.limit;
    const items = filtered.slice(startIndex, startIndex + filters.limit);

    return {
      items,
      total: filtered.length,
      page: filters.page,
      totalPages: Math.ceil(filtered.length / filters.limit),
    };
  }

  async findById(id: UserId): Promise<User | null> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return null; // Implementation would fetch by ID
  }

  async save(user: User): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  async delete(id: UserId): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 300));
  }
}

// ===== CUSTOM HOOKS (Application Services) =====
interface UseAsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

function useAsync<T>(
  asyncFunction: () => Promise<T>,
  dependencies: React.DependencyList = []
): UseAsyncState<T> & { refetch: () => Promise<void> } {
  const [state, setState] = useState<UseAsyncState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const result = await asyncFunction();
      setState({ data: result, loading: false, error: null });
    } catch (error) {
      setState({ data: null, loading: false, error: error as Error });
    }
  }, dependencies);

  useEffect(() => {
    execute();
  }, [execute]);

  return { ...state, refetch: execute };
}

// Advanced debounced search hook with cleanup
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

// Repository dependency injection hook
function useUserRepository(): UserRepository {
  return useMemo(() => new HttpUserRepository(), []);
}

// ===== PRESENTATION LAYER =====

// Higher-Order Component for Error Boundaries (Error Handling)
interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-600">{this.state.error?.message}</p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Compound Component Pattern (Advanced React Pattern)
interface DataTableContextValue {
  selectedItems: Set<string>;
  onSelectionChange: (id: string, selected: boolean) => void;
  onSelectAll: () => void;
  onClearSelection: () => void;
}

const DataTableContext = React.createContext<DataTableContextValue | null>(
  null
);

const useDataTableContext = () => {
  const context = React.useContext(DataTableContext);
  if (!context) {
    throw new Error("DataTable components must be used within DataTable");
  }
  return context;
};

// Performance optimized with React.memo and useCallback
const UserRow = React.memo<{
  user: User;
  onAction: (action: string, user: User) => void;
}>(({ user, onAction }) => {
  const { selectedItems, onSelectionChange } = useDataTableContext();

  const handleSelectionChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onSelectionChange(user.id, e.target.checked);
    },
    [user.id, onSelectionChange]
  );

  const handleAction = useCallback(
    (action: string) => (e: React.MouseEvent) => {
      e.stopPropagation();
      onAction(action, user);
    },
    [onAction, user]
  );

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4">
        <input
          type="checkbox"
          checked={selectedItems.has(user.id)}
          onChange={handleSelectionChange}
          className="rounded border-gray-300"
        />
      </td>
      <td className="px-6 py-4 font-medium text-gray-900">{user.name}</td>
      <td className="px-6 py-4 text-gray-600">{user.email}</td>
      <td className="px-6 py-4">
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            user.role === "ADMIN"
              ? "bg-purple-100 text-purple-800"
              : user.role === "MODERATOR"
              ? "bg-blue-100 text-blue-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {user.role}
        </span>
      </td>
      <td className="px-6 py-4">
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            user.isActive
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {user.isActive ? "Active" : "Inactive"}
        </span>
      </td>
      <td className="px-6 py-4 text-gray-600">
        {user.createdAt.toLocaleDateString()}
      </td>
      <td className="px-6 py-4">
        <div className="flex space-x-2">
          <button
            onClick={handleAction("view")}
            className="p-1 text-gray-600 hover:text-blue-600 transition-colors"
            title="View"
          >
            <Eye size={16} />
          </button>
          <button
            onClick={handleAction("edit")}
            className="p-1 text-gray-600 hover:text-green-600 transition-colors"
            title="Edit"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={handleAction("delete")}
            className="p-1 text-gray-600 hover:text-red-600 transition-colors"
            title="Delete"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
});

// Lazy loaded component for code splitting
const UserDetailModal = lazy(() =>
  Promise.resolve({
    default: ({
      user,
      isOpen,
      onClose,
    }: {
      user: User | null;
      isOpen: boolean;
      onClose: () => void;
    }) => {
      if (!isOpen || !user) return null;

      return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">User Details</h3>
            <div className="space-y-2">
              <p>
                <strong>Name:</strong> {user.name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Role:</strong> {user.role}
              </p>
              <p>
                <strong>Status:</strong> {user.isActive ? "Active" : "Inactive"}
              </p>
              <p>
                <strong>Created:</strong> {user.createdAt.toLocaleDateString()}
              </p>
            </div>
            <button
              onClick={onClose}
              className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        </div>
      );
    },
  })
);

// Main component showcasing all patterns
const UserManagementSystem: React.FC = () => {
  const repository = useUserRepository();

  // State management following immutability principles
  const [filters, setFilters] = useState<UserFilters>({
    page: 1,
    limit: 10,
    search: "",
    role: undefined,
    isActive: undefined,
  });

  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);

  const debouncedSearch = useDebounce(filters.search, 300);

  // Memoized filters for performance
  const effectiveFilters = useMemo(
    () => ({
      ...filters,
      search: debouncedSearch,
    }),
    [filters, debouncedSearch]
  );

  // Async data fetching with proper error handling
  const {
    data: userResult,
    loading,
    error,
    refetch,
  } = useAsync(
    () => repository.findAll(effectiveFilters),
    [effectiveFilters, repository]
  );

  // Selection management callbacks
  const handleSelectionChange = useCallback((id: string, selected: boolean) => {
    setSelectedItems((prev) => {
      const newSet = new Set(prev);
      if (selected) {
        newSet.add(id);
      } else {
        newSet.delete(id);
      }
      return newSet;
    });
  }, []);

  const handleSelectAll = useCallback(() => {
    if (!userResult?.items) return;

    setSelectedItems((prev) => {
      const allIds = userResult.items.map((user) => user.id);
      const allSelected = allIds.every((id) => prev.has(id));

      if (allSelected) {
        return new Set();
      } else {
        return new Set(allIds);
      }
    });
  }, [userResult?.items]);

  const handleClearSelection = useCallback(() => {
    setSelectedItems(new Set());
  }, []);

  // Action handlers
  const handleUserAction = useCallback((action: string, user: User) => {
    switch (action) {
      case "view":
        setSelectedUser(user);
        setShowModal(true);
        break;
      case "edit":
        console.log("Edit user:", user);
        break;
      case "delete":
        console.log("Delete user:", user);
        break;
    }
  }, []);

  const handleFilterChange = useCallback(
    <K extends keyof UserFilters>(key: K, value: UserFilters[K]) => {
      setFilters((prev) => ({
        ...prev,
        [key]: value,
        page: key !== "page" ? 1 : (value as number), // Reset page when other filters change, ensure page is number
      }));
    },
    []
  );

  // Pagination
  const handlePageChange = useCallback(
    (newPage: number) => {
      handleFilterChange("page", newPage);
    },
    [handleFilterChange]
  );

  const contextValue = useMemo(
    () => ({
      selectedItems,
      onSelectionChange: handleSelectionChange,
      onSelectAll: handleSelectAll,
      onClearSelection: handleClearSelection,
    }),
    [
      selectedItems,
      handleSelectionChange,
      handleSelectAll,
      handleClearSelection,
    ]
  );

  if (error) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-semibold text-red-600 mb-2">
          Error Loading Users
        </h2>
        <p className="text-gray-600 mb-4">{error.message}</p>
        <button
          onClick={refetch}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="p-6 max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            User Management System
          </h1>
          <p className="text-gray-600">
            Demonstrating senior-level React patterns and clean architecture
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow mb-6 p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search users..."
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <select
              value={filters.role || ""}
              onChange={(e) =>
                handleFilterChange(
                  "role",
                  (e.target.value as UserRole) || undefined
                )
              }
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Roles</option>
              <option value="ADMIN">Admin</option>
              <option value="USER">User</option>
              <option value="MODERATOR">Moderator</option>
            </select>

            <select
              value={filters.isActive?.toString() || ""}
              onChange={(e) =>
                handleFilterChange(
                  "isActive",
                  e.target.value ? e.target.value === "true" : undefined
                )
              }
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Status</option>
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>

            <div className="flex space-x-2">
              <button
                onClick={refetch}
                disabled={loading}
                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
              >
                <RefreshCw
                  className={`mr-2 ${loading ? "animate-spin" : ""}`}
                  size={16}
                />
                Refresh
              </button>
              <button className="flex items-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
                <Plus className="mr-2" size={16} />
                Add User
              </button>
            </div>
          </div>
        </div>

        {/* Selected items actions */}
        {selectedItems.size > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <span className="text-blue-800">
                {selectedItems.size} user{selectedItems.size !== 1 ? "s" : ""}{" "}
                selected
              </span>
              <div className="flex space-x-2">
                <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                  Bulk Edit
                </button>
                <button className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600">
                  Delete Selected
                </button>
                <button
                  onClick={handleClearSelection}
                  className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600"
                >
                  Clear Selection
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Data Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <RefreshCw className="mx-auto animate-spin mb-4" size={32} />
              <p className="text-gray-600">Loading users...</p>
            </div>
          ) : (
            <DataTableContext.Provider value={contextValue}>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <input
                        type="checkbox"
                        checked={
                          userResult?.items &&
                          userResult.items.length > 0 &&
                          userResult.items.every((user) =>
                            selectedItems.has(user.id)
                          )
                        }
                        onChange={handleSelectAll}
                        className="rounded border-gray-300"
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {userResult?.items?.map((user) => (
                    <UserRow
                      key={user.id}
                      user={user}
                      onAction={handleUserAction}
                    />
                  ))}
                </tbody>
              </table>
            </DataTableContext.Provider>
          )}
        </div>

        {/* Pagination */}
        {userResult && userResult.totalPages > 1 && (
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-700">
              Showing {(userResult.page - 1) * filters.limit + 1} to{" "}
              {Math.min(userResult.page * filters.limit, userResult.total)} of{" "}
              {userResult.total} results
            </div>
            <div className="flex space-x-1">
              <button
                onClick={() => handlePageChange(userResult.page - 1)}
                disabled={userResult.page === 1}
                className="px-3 py-2 text-sm border border-gray-300 rounded-md disabled:opacity-50 hover:bg-gray-50"
              >
                Previous
              </button>
              {Array.from(
                { length: Math.min(5, userResult.totalPages) },
                (_, i) => {
                  const page = userResult.page - 2 + i;
                  if (page < 1 || page > userResult.totalPages) return null;
                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-3 py-2 text-sm border rounded-md ${
                        page === userResult.page
                          ? "bg-blue-500 text-white border-blue-500"
                          : "border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {page}
                    </button>
                  );
                }
              )}
              <button
                onClick={() => handlePageChange(userResult.page + 1)}
                disabled={userResult.page === userResult.totalPages}
                className="px-3 py-2 text-sm border border-gray-300 rounded-md disabled:opacity-50 hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Modal with Suspense for code splitting */}
        <Suspense fallback={<div>Loading...</div>}>
          <UserDetailModal
            user={selectedUser}
            isOpen={showModal}
            onClose={() => {
              setShowModal(false);
              setSelectedUser(null);
            }}
          />
        </Suspense>
      </div>
    </ErrorBoundary>
  );
};

export default UserManagementSystem;
