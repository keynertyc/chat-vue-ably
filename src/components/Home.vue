<template>
  <div class="row">
    <div class="col-md-12" style="border: 1px solid black; height: 400px; overflow: scroll;">
      <Message v-for="(message, index) in $store.state.messages" :message="message" key="index"></Message>
    </div>
    <div class="col-md-12">
      <form @submit.prevent="setName" class="form-inline" v-if="shotFormSetName">
        <div class="form-group">
          <input type="text" class="form-control" name="name" id="name" v-model="name" placeholder="Set you Name">
        </div>
        <button class="btn btn-default">Save</button>
      </form>
      <form @submit.prevent="sendMessage" class="form-inline" v-if="showFormSendMessage">
        <div class="form-group">
          <input type="text" class="form-control" name="message" id="message" v-model="message" placeholder="Enter Message">
        </div>
        <button class="btn btn-default">Send</button>
      </form>
    </div>

  </div>
</template>

<script>

import client from '@/ably';
import store from '@/store';
import * as types from '@/store/mutation-types';
import Message from '@/components/Message';

/* eslint no-console: ["error", { allow: ["log", "warn", "error"] }] */
client.connection.on('connected', () => {
  console.log('connected');
});

const channel = client.channels.get('chat1');

channel.subscribe((message) => {
    //  message.name // 'greeting'
    //  message.data // 'Hello World!'
  store.commit(types.addMessage, message);
});

channel.history({ limit: 5, direction: 'forwards' }, (err, messagesPage) => {
  messagesPage.items.forEach((item) => {
    store.commit(types.addMessage, item);
  });
});

export default {
  components: {
    Message,
  },
  data() {
    return {
      message: '',
      name: '',
      shotFormSetName: true,
      showFormSendMessage: false,
    };
  },
  methods: {
    setName() {
      localStorage.setItem('name', this.name);
      this.shotFormSetName = false;
      this.showFormSendMessage = true;
    },
    sendMessage() {
      channel.publish('mainroom', {
        name: localStorage.getItem('name'),
        message: this.message,
      });
      this.message = '';
    },
  },
  created() {
    if (localStorage.getItem('name') !== null) {
      this.shotFormSetName = false;
      this.showFormSendMessage = true;
    } else {
      this.showFormSendMessage = false;
      this.shotFormSetName = true;
    }
  },
};
</script>

<style>
</style>
