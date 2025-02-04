<template>
  <v-dialog v-model="internalValue" max-width="400">
    <v-card class="confirm-dialog-card">
      <v-card-title class="headline">{{ title }}</v-card-title>
      <v-card-text>{{ message }}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text class="cancel-btn" @click="cancel">취소</v-btn>
        <v-btn color="primary" text class="confirm-btn" @click="confirm">확인</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ConfirmDialog',
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '확인',
    },
    message: {
      type: String,
      default: '정말 실행하시겠습니까?',
    },
  },
  computed: {
    internalValue: {
      get() {
        return this.modelValue;
      },
      set(val) {
        this.$emit('update:modelValue', val);
      },
    },
  },
  methods: {
    confirm() {
      this.internalValue = false;
      this.$emit('confirm');
    },
    cancel() {
      this.internalValue = false;
      this.$emit('cancel');
    },
  },
};
</script>

<style scoped>
.confirm-dialog-card {
  border-radius: 16px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.25);
  overflow: hidden;
}

.v-card-title.headline {
  font-size: 1.5rem;
  font-weight: bold;
  color: #424242;
  padding: 16px;
  border-bottom: 1px solid #e0e0e0;
}

.v-card-text {
  font-size: 1.1rem;
  color: #616161;
  padding: 16px;
}

.v-card-actions {
  padding: 12px 16px;
}

.confirm-btn {
  font-size: 1rem;
  font-weight: bold;
}

.cancel-btn {
  color: #d32f2f;
  font-size: 1rem;
}
</style> 