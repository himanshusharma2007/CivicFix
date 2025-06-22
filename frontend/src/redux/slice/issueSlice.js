import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import issueService from '../../services/issueService';

// Async thunks for issue actions
export const createIssue = createAsyncThunk('issues/createIssue', async (issueData, { rejectWithValue }) => {
  try {
    const response = await issueService.createIssue(issueData);
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const getAllIssues = createAsyncThunk('issues/getAllIssues', async (_, { rejectWithValue }) => {
  try {
    const response = await issueService.getAllIssues();
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const getMyIssues = createAsyncThunk('issues/getMyIssues', async (_, { rejectWithValue }) => {
  try {
    const response = await issueService.getMyIssues();
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const getHighSeverityIssues = createAsyncThunk('issues/getHighSeverityIssues', async (_, { rejectWithValue }) => {
  try {
    const response = await issueService.getHighSeverityIssues();
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const getIssueById = createAsyncThunk('issues/getIssueById', async (id, { rejectWithValue }) => {
  try {
    const response = await issueService.getIssueById(id);
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const upvoteIssue = createAsyncThunk('issues/upvoteIssue', async (id, { rejectWithValue }) => {
  try {
    const response = await issueService.upvoteIssue(id);
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const addComment = createAsyncThunk('issues/addComment', async ({ id, commentData }, { rejectWithValue }) => {
  try {
    const response = await issueService.addComment(id, commentData);
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const updateIssueStatus = createAsyncThunk('issues/updateIssueStatus', async ({ id, statusData }, { rejectWithValue }) => {
  try {
    const response = await issueService.updateIssueStatus(id, statusData);
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const getResolvedIssues = createAsyncThunk('issues/getResolvedIssues', async (_, { rejectWithValue }) => {
  try {
    const response = await issueService.getResolvedIssues();
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});

const initialState = {
  issues: [],
  currentIssue: null,
  myIssues: [],
  highSeverityIssues: [],
  resolvedIssues: [],
  loading: false,
  error: null,
};

const issueSlice = createSlice({
  name: 'issues',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetCurrentIssue: (state) => {
      state.currentIssue = null;
    },
  },
  extraReducers: (builder) => {
    // Create Issue
    builder
      .addCase(createIssue.pending, (指標: state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createIssue.fulfilled, (state, action) => {
        state.loading = false;
        state.issues.push(action.payload);
      })
      .addCase(createIssue.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Get All Issues
    builder
      .addCase(getAllIssues.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllIssues.fulfilled, (state, action) => {
        state.loading = false;
        state.issues = action.payload;
      })
      .addCase(getAllIssues.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Get My Issues
    builder
      .addCase(getMyIssues.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyIssues.fulfilled, (state, action) => {
        state.loading = false;
        state.myIssues = action.payload;
      })
      .addCase(getMyIssues.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Get High Severity Issues
    builder
      .addCase(getHighSeverityIssues.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getHighSeverityIssues.fulfilled, (state, action) => {
        state.loading = false;
        state.highSeverityIssues = action.payload;
      })
      .addCase(getHighSeverityIssues.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Get Issue By ID
    builder
      .addCase(getIssueById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getIssueById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentIssue = action.payload;
      })
      .addCase(getIssueById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Upvote Issue
    builder
      .addCase(upvoteIssue.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(upvoteIssue.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.issues.findIndex(issue => issue.id === action.payload.id);
        if (index !== -1) {
          state.issues[index] = action.payload;
        }
        if (state.currentIssue?.id === action.payload.id) {
          state.currentIssue = action.payload;
        }
      })
      .addCase(upvoteIssue.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Add Comment
    builder
      .addCase(addComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.issues.findIndex(issue => issue.id === action.payload.id);
        if (index !== -1) {
          state.issues[index] = action.payload;
        }
        if (state.currentIssue?.id === action.payload.id) {
          state.currentIssue = action.payload;
        }
      })
      .addCase(addComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Update Issue Status
    builder
      .addCase(updateIssueStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateIssueStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.issues.findIndex(issue => issue.id === action.payload.id);
        if (index !== -1) {
          state.issues[index] = action.payload;
        }
        if (state.currentIssue?.id === action.payload.id) {
          state.currentIssue = action.payload;
        }
      })
      .addCase(updateIssueStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Get Resolved Issues
    builder
      .addCase(getResolvedIssues.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getResolvedIssues.fulfilled, (state, action) => {
        state.loading = false;
        state.resolvedIssues = action.payload;
      })
      .addCase(getResolvedIssues.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, resetCurrentIssue } = issueSlice.actions;
export default issueSlice.reducer;