interface MutationPropTypes {
  onMutationSuccess: (attributes?: any) => void;
  onMutationFailed: (error: any) => void;
  id?: number; // Optional ID that used for add extra refetch logic, e.g folderId for refetch folderById after mutation
}

interface APIResponse {
  success: boolean;
  statusCode: number;
  message: string;
}

interface AuthContext {
  userData: UserInfo;
  logout: () => void;
  setUserData: (userData: UserInfo) => void;
  isAuthLoading: boolean;
  isLoginLoading: boolean;
  userLogin: any;
}

interface UserInfo {
  id: string;
  username: string;
  userType: string;
  role: string;
  company?: {
    name: string;
    createdAt: string;
    updatedAt: string;
    id: string;
  };
  vendor?: {
    name: string;
    vendorTags: string[];
    createdAt: string;
    updatedAt: string;
    id: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface UserLoginResponse extends APIResponse {
  data: {
    user: {
      id: string;
      username: string;
      userType: string;
      role: string;
      vendor?: string;
      company?: string;
      createdAt: string;
      updatedAt: string;
    };
    accessToken: string;
  };
}
