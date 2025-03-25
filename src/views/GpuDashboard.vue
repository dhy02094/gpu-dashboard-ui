<template>
  <div class="dashboard">
    <header class="dashboard-header">
      <div class="header-titles">
        <h1>GPU Dashboard</h1>
        <p>KTDS H100 장비에 떠있는 Pod 정보를 조회하는 Dashboard 입니다.</p>
      </div>
      <!-- 오른쪽 정렬된 select box -->
      <div class="namespace-select">
        <select v-model="selectedNamespace" @change="loadPods">
          <option v-for="ns in namespaces" :key="ns" :value="ns">
            {{ ns }}
          </option>
        </select>
      </div>
    </header>
    <section class="dashboard-content">
      <!-- <v-data-table
      v-model:sort-by="sortBy"
      :headers="headers"
      :items="desserts"
      hide-default-footer
      ></v-data-table> -->
      <table>
        <thead>
          <tr>
            <th>이름</th>
            <th>GPU 장치</th>
            <th>상태</th>
            <th>가동시간</th>
            <th>사용자</th>
            <th class="action-column"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="pod in pods" :key="pod.podname">
            <td>{{ pod.podname }}</td>
            <td>{{ pod.gpuDevices }}</td>
            <td :class="statusClass(pod.podstatus)">{{ pod.podstatus }}</td>
            <td>{{ pod.poduptime }}</td>
            <!-- <td>김태형</td> -->
            <td>
              <input 
                v-model="pod.username" 
                @keyup.enter="updateUser(pod)"
                placeholder="현재 사용자" 
              />
            </td>
            <td class="text-center" style="text-align: center;">
              <button
                @click="confirmRestart(pod)" 
                class="restart-button"
                v-tooltip.bottom="'Restart'"
              >
                <font-awesome-icon :icon="['fas', 'redo']" class="restart-icon" />
              </button> 
            </td>
          </tr>
        </tbody>
      </table>
    </section>
    <!-- 커스텀 확인 다이얼로그 추가 -->
    <ConfirmDialog
      v-model="showConfirm"
      title="재실행 확인"
      :message="podToRestart ? `${podToRestart.name} pod를 재실행하시겠습니까?` : ''"
      @confirm="handleConfirmRestart"
    />
  </div>
</template>

<script>
import axios from 'axios';
import ConfirmDialog from '@/components/ConfirmDialog.vue';

export default {
  name: "GpuDashboard",
  components: {
    ConfirmDialog,
  },
  data() {
    return {
      pods: [],
      namespaces: ['aidx', 'abclab',],
      selectedNamespace: localStorage.getItem('selectedNamespace') || 'aidx',
      podToRestart: null,    // 재실행 대상 pod 저장
      showConfirm: false,    // 다이얼로그 표시 여부
    }
  },
  methods: {
    loadPods() {
      axios.post('/api/pods/db', { namespace: this.selectedNamespace })
        .then(response => {
          this.pods = response.data.result;
        })
        .catch(error => {
          console.error('API 호출 중 에러 발생:', error);
        });
    },
    statusClass(status) {
      // 상태에 따라 글자 색상을 지정
      switch (status) {
        case 'Running':
          return 'status-running';
        case 'Pending':
          return 'status-pending';
        case 'Terminated':
        case 'Failed':
          return 'status-terminated';
        case 'Deleted':
          return 'status-terminated';
        default:
          return '';
      }
    },
    confirmRestart(pod) {
      this.podToRestart = pod;
      this.showConfirm = true;
    },
    handleConfirmRestart() {
      if (this.podToRestart) {
        this.restartPod(this.podToRestart);
        this.podToRestart = null;
      }
    },
    restartPod(pod) {
      console.log(`Dashboard.vue: ${pod.podname} pod 재실행 시도`);
      axios.post('/api/pods/delete', { 
        namespace: this.selectedNamespace, 
        podName: pod.podname 
      })
      .then(response => {
        console.log(`Dashboard.vue: ${pod.podname} pod 재실행 성공`, response);
        // 재실행 후 pod 목록 갱신 (필요시)
        this.loadPods();
      })
      .catch(error => {
        console.error(`Dashboard.vue: ${pod.podname} pod 재실행 실패:`, error);
      });
    },
    updateUser(pod) {
      console.log('전달된 pod 데이터:', pod); // 디버깅용 로그 추가
      axios.post('/api/pods/update/username', {
        namespace: this.selectedNamespace,
        podname: pod.podname,
        username: pod.username
      })
      .then(response => {
        console.log(`Dashboard.vue: ${pod.username} pod 사용자 업데이트 성공`, response);
      })
      .catch(error => {
        console.error(`Dashboard.vue: ${pod.username} pod 사용자 업데이트 실패:`, error);
      });
    }
  },
  watch: {
    selectedNamespace(newNamespace) {
      localStorage.setItem('selectedNamespace', newNamespace);
    }
  },
  mounted() {
    this.loadPods();
  },
};
</script>

<style scoped>
.dashboard {
  background: #FFFFFF;
  border-radius: 8px;
  padding: 20px;
  margin: 40px auto;
  max-width: 1000px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family:  'Malgun Gothic', sans-serif;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 10px;
}

.header-titles h1 {
  margin: 0;
  font-size: 2rem;
  color: #333;
}

.header-titles p {
  margin: 5px 0 0;
  font-size: 1rem;
  color: #666;
}

/* 우측에 위치하는 select box */
.namespace-select {
  margin-top: 10px;
}

.namespace-select select {
  padding: 8px 30px 8px 12px; /* 오른쪽에 여유 공간 추가 */
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  font-size: 1rem;
  background: #fafafa;
  transition: border-color 0.3s;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=US-ASCII,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='gray'><polygon points='0,0 12,0 6,6'/></svg>");
  background-repeat: no-repeat;
  background-position: right 8px center;
}

.namespace-select select:focus {
  border-color: #007BFF;
}

.dashboard-content {
  margin-top: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 5px;
  height: 10px;
  overflow-y: auto;
}

th, td {
  padding: 12px 15px;
  border-bottom: 1px solid #e0e0e0;
  text-align: left;
  font-size: 0.9rem; /* 글씨 크기 줄임 */
}

th {
  background-color: #f7f7f7;
  font-weight: 700;
  color: #555;
  font-size: 0.9rem; /* 헤더 글씨 크기도 동일하게 줄임 */
}

/* tr:nth-child(even) {
  background-color: #f9f9f9;
} */

/* 상태별 글자 색상 */
.status-running {
  color: green;
  font-weight: bold;
}

.status-pending {
  color: orange;
  font-weight: bold;
}

.status-terminated {
  color: red;
  font-weight: bold;
}

.restart-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: #007BFF;
  font-size: 1.2rem;
  transition: color 0.3s;
  display: flex;
  align-items: center;
}

.restart-button:hover {
  color: #0056b3;
}

.restart-icon {
  width: 20px;
  height: 20px;
  margin-right: 0;
}

.action-column {
  width: 50px; /* 넓이를 늘림 */
  text-align: center;
}

tr:last-child td {
  border-bottom: none;
}
</style>
