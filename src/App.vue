<template>
  <div id="app">
    <!-- 侧边栏按钮 -->
    <button
        class="sidebar-toggle"
        :class="{ 'open': isSidebarOpen }"
        @click="toggleSidebar"
    ></button>

    <!-- sidebar -->
    <div class="sidebar" :class="{ open: isSidebarOpen }">
      <!-- new task button -->
      <button class="new-task-btn" @click="createNewTask" style="color: white;">➕ New Task</button>

      <!-- history list -->
      <ul class="history-list">
        <li v-for="task in sortedTasks" :key="task.id">
          <div class="task-info">
            <span class="task-title">{{ task.title }}</span>
<!--            <span class="task-date">{{ task.date | formatDate }}</span>-->
          </div>
          <span class="task-status">{{ task.status }}</span>
          <!-- The trash can icon represents the delete button -->
          <button class="delete-btn" @click="deleteTask(task.id)">
            🗑️
          </button>
        </li>
      </ul>

    </div>

    <!-- Main content area -->
    <div class="app-container" :class="{ shifted: isSidebarOpen }">
      <h1>GraphFormer Disassembler</h1>
      <!-- File upload section -->
      <file-upload @file-uploaded="handleFileUpload"></file-upload>
      <!-- Disassembly results display section -->
      <disassembly-results :fileUrl="resultFileUrl" :results="disassemblyResults"></disassembly-results>
    </div>
  </div>
</template>

<script>
import FileUpload from '@/components/FileUpload.vue';
import DisassemblyResults from '@/components/DisassemblyResults.vue';

export default {
  components: {
    FileUpload,
    DisassemblyResults
  },
  data() {
    return {
      isSidebarOpen: true,
      tasks: [],
      isDisassembling: false,
      disassemblyComplete: false,
      progress: 0,
      disassemblyLog: '',
      resultFileUrl: '',
      disassemblyResults: ''
    };
  },
  computed: {
    sortedTasks() {
      return this.tasks.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
    },
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    createNewTask() {
      // Example logic for adding a new task, here is just a hard-coded example
      // TODO
      const newTask = {
        id: this.tasks.length + 1,
        title: `New Task ${this.tasks.length + 1}`,
        // status: 'Pending',
        // date: new Date().toISOString()
      };
      this.tasks.push(newTask);
    },
    selectTask(task) {
      // Select the task logic, here you can set the currently selected task, open the detailed view and so on
      // This is only printed to the console as an example
      // TODO
      console.log('Selected task:', task);
    },
    deleteTask(taskId) {
      // Deletes the specified task
      this.tasks = this.tasks.filter(task => task.id !== taskId);
    },
    handleFileUpload(file) {
      console.log('File uploaded:', file.name);
      this.startDisassembly(file);
    },
    startDisassembly(file) {
      console.log('Disassembly started for:', file.name);
      // Simulate the disassembly process
      // TODO
      this.isDisassembling = true;
      setTimeout(() => {
        this.progress = 100;
        this.disassemblyLog = 'Disassembly complete!';
        this.isDisassembling = false;
        this.disassemblyComplete = true;
        this.resultFileUrl = '/path/to/resultFile.txt';
        this.disassemblyResults = 'Simulated disassembly results here...';
      }, 3000);
    },
    // Other method...
    // TODO
  }
};
</script>


<style>
/* Import global styles */
@import './assets/styles/main.css';

.sidebar-toggle {
  /* Adjust the button's initial position and style */
  position: fixed;
  top: 50%;
  left: 0;
  z-index: 200;
  background-color: transparent;
  border: none;
  cursor: pointer;
  transform: translateY(-50%);
  transition: left 0.3s; /* This will animate the movement */
}

.sidebar-toggle::before {
  /* Create a line */
  content: '';
  display: block;
  height: 20px;
  width: 2px;
  background-color: #aaa; /* Initial gray color */
  transition: background-color 0.3s; /* This will animate the color change */
}

.sidebar-toggle:hover::before {
  /* Change the line color on hover */
  background-color: black; /* Hover color */
}

.sidebar-toggle.open {
  /* Position the toggle button on the sidebar when open */
  left: 250px; /* Should match the sidebar's width */
}

/* Sidebar styles */
.sidebar {
  width: 250px;
  background: #fff;
  position: fixed;
  top: 0;
  bottom: 0;
  left: -250px;
  transition: left 0.3s;
  z-index: 100;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.sidebar.open {
  left: 0;
}

/* New task button style */
.new-task-btn {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #1a73e8; /* A bright color for visibility */
  color: white;
  text-align: center;
  font-size: 1em;
  margin-bottom: 10px;
  border: none;
  cursor: pointer;
}

.new-task-btn:hover {
  background-color: #0c5cc7;
}

/* History list style */
.history-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.history-list li {
  cursor: pointer;
  padding: 10px;
  border-bottom: 1px solid #eee;
  transition: background-color 0.2s;
}

.history-list li:hover {
  background-color: #f3f3f3;
}

.task-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
}

.task-title {
  font-weight: bold;
}

.task-date {
  font-size: 0.8em;
  color: #666;
}

.task-status {
  font-size: 0.9em;
  color: #888;
}

/* Additional styles for app-container and other elements if necessary */
.app-container {
  padding: 20px;
  transition: transform 0.3s, max-width 0.3s ease-in-out;
  width: 100%;
  max-width: 800px; /* Set a max-width for content */
  margin: 0 auto; /* Center the content */
}

.app-container.shifted {
  /* When the sidebar is open, calculate the shift to keep the content centered */
  transform: translateX(calc((100vw - max(800px, 100vw - 250px)) / 2));
}

@media (max-width: 768px) {
  .sidebar {
    width: 200px; /* Adjust sidebar width on smaller screens */
  }

  .app-container.shifted {
    /* Adjust the content shift as well on smaller screens */
    transform: translateX(calc((100vw - max(800px, 100vw - 200px)) / 2));
  }
}

/* You can continue to add more specific styles as needed */
</style>

